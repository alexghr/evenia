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
        mysqlUser = "mysql";
        # remote host running MySQL (MariaDB)
        mysqlHost = "b1";
        localSocket = "/tmp/mysql.sock";
        remoteSocket = "/var/run/mysqld/mysqld.sock";
        # wrapper shell script to use local socket
        mysql = pkgs.writeShellScriptBin "mysql" ''
          #!/usr/bin/env bash
          ${pkgs.mysql}/bin/mysql --socket=${localSocket} --user ${mysqlUser} "$@"
        '';
      in
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs-18_x
              pkgs.corepack
              pkgs.prisma-engines
              mysql
            ];

            PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
            PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
            PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
            PRISMA_INTROSPECTION_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/introspection-engine";
            PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";

            DATABASE_URL = "mysql://${mysqlUser}@localhost/events?socket=${localSocket}";

            shellHook = ''
              trap 'pkill -f ${localSocket}; rm ${localSocket}' EXIT
              ${pkgs.openssh}/bin/ssh -N -f -L ${localSocket}:${remoteSocket} ${mysqlUser}@${mysqlHost}
            '';
          };
        }
    );
}
