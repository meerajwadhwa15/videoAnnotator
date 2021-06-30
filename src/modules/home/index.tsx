import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  decrement,
  getSinglePokemon,
  increment,
  selectCount,
  status,
  pokemonInfo
} from './slice';
import styles from './style.module.scss';

export default function Home() {
    const count = useAppSelector(selectCount);
    const loading = useAppSelector(status);
    const pokemonData: any = useAppSelector(pokemonInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSinglePokemon('pikachu'));
    }, []);

    return (
        <div>
            <h1 className={styles.center}>Hello World!</h1>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                    >
                    -
                </button>
            </div>
            <div className={styles.center}>
                <p>{loading == 'loading' ? 'Loading pokemon data...' : ''}</p>
            </div>
            {
                Object.keys(pokemonData).length > 0 && (
                    <div className={`${styles.center} ${styles.bottomSpacing}`}>
                        <div><img src={pokemonData.sprites.front_default} alt="image" /></div>
                        <div className={styles.bottomSpacing}>ID: {pokemonData.id}</div>
                        <div className={styles.bottomSpacing}>Name: {pokemonData.name}</div>
                        <div className={styles.bottomSpacing}>Height: {pokemonData.height}</div>
                        <div className={styles.bottomSpacing}>Weight: {pokemonData.weight}</div>
                        <div className={styles.bottomSpacing}>Type: {pokemonData.types[0].type.name}</div>
                    </div>
                )
            }
        </div>
    )
}