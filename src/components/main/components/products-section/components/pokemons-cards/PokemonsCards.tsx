import { Component } from 'react';
import styles from './PokemonsCards.module.scss';
import { messages } from './messages';

interface Props {
  name: string;
  description: { flavor_text: string }[];
  image: string;
}

export class PokemonsCards extends Component<Props> {
  public render() {
    const { name, description, image } = this.props;

    return (
      <>
        <div className={styles.pokemon}>
          <div className={styles.name}>
            <p>{name}</p>
          </div>
          <div className={styles.description}>
            <p>{description[0].flavor_text || messages.titleNotDescription}</p>
          </div>
          <div className={styles.image}>
            <img src={image} alt={name} className={styles.img} />
          </div>
        </div>
      </>
    );
  }
}
