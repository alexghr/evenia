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
      in
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs-18_x
              pkgs.corepack
            ];
          };
        }
    );
}
