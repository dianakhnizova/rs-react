import type { FlavorTextEntries } from './types';

export interface IPokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface IPokemonDescriptionResponse {
  flavor_text_entries: FlavorTextEntries[];
}

export interface IPokemonListResponse {
  results: { name: string; url: string }[];
}
