import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;


const BeersPage = ({ data }) => {
  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.lenght} in stock`} />
      <h2 className="center">
        We have ${data.beers.nodes.length} Beers Available. Dine in Only !
      </h2>
      <BeerGridStyles>
        {data.beers.nodes.map(beer => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {rating}
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          )
        })}
      </BeerGridStyles>
    </>
  )
};

export default BeersPage;

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;