{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  inputs.corepack.url = "github:alexghr/corepack.nix";
  inputs.corepack.inputs.nixpkgs.follows = "nixpkgs";

  outputs = { self, nixpkgs, flake-utils, corepack }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ corepack.overlays.default ];
        };
        # remote host running MySQL (MariaDB)
        mysqlHost = "mysql@b1";
        localSocket = "/tmp/mysql.sock";
        remoteSocket = "/var/run/mysqld/mysqld.sock";
        # wrapper shell script to use local socket
        mysql = pkgs.writeShellScriptBin "mysql" ''
          #!/usr/bin/env bash
          ${pkgs.mysql}/bin/mysql --socket=${localSocket} "$@"
        '';
      in
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs-18_x
              pkgs.corepack
              mysql
            ];

            shellHook = ''
              trap 'pkill -f ${localSocket}; rm ${localSocket}' EXIT
              ${pkgs.openssh}/bin/ssh -N -f -L ${localSocket}:${remoteSocket} ${mysqlHost}
            '';
          };
        }
    );
}
