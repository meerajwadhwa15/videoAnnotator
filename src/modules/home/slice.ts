import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

interface homeState {
  value: number;
  status: string;
  pokemon: Record<string, unknown>;
}

const initialState: homeState = {
  value: 0,
  status: 'idle',
  pokemon: {},
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    getSinglePokemon: (state) => {
      state.status = 'loading';
    },
    getSinglePokemonSuccess: (state, action) => {
      state.status = 'idle';
      state.pokemon = action.payload;
    },
  },
});

export const { increment, decrement, getSinglePokemon, getSinglePokemonSuccess } =
  homeSlice.actions;

export const selectCount = (state: RootState) => state.home.value;
export const status = (state: RootState) => state.home.status;
export const pokemonInfo = (state: RootState) => state.home.pokemon;

export default homeSlice.reducer;
