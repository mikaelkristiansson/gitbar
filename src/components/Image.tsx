import { useState, Fragment } from 'react';

function Image({
  src,
  fallback: Fallback,
  className,
}: {
  src: string;
  fallback: any;
  className?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <Fragment>
      <Fallback className={`${className} ${error ? 'block' : 'hidden'}`} />
      <img
        className={`${className} ${error ? 'hidden' : 'block'}`}
        src={src}
        alt={'image'}
        onError={() => setError(true)}
      />
    </Fragment>
  );
}

export default Image;
