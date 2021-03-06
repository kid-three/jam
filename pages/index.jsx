import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_ID,
    accessToken: process.env.CONTENTFULL_ACCESS_KEY,
  });

  const rest = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: rest.items,
    },
    revalidate: 10,
  };
};

export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
      <style jsx>
        {`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px 60px;
          }
        `}
      </style>
    </div>
  );
}
