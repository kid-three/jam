import Link from 'next/link';
import Image from 'next/image';

const RecipeCard = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;
  return (
    <div className='card'>
      <div className='featured'>
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width={400}
          height={300}
        />
      </div>
      <div className='content'>
        <div className='info'>
          <h4>{title}</h4>
          <p>Takes approx {cookingTime}</p>
        </div>
      </div>
      <div className='actions'></div>
      <Link href={'/recipes/' + slug}>
        <a>Cook This</a>
      </Link>
    </div>
  );
};

export default RecipeCard;
