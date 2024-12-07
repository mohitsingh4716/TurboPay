import Image from 'next/image';

export const ImageSection=()=> {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700">
      <div className="relative w-full h-full">
        <Image
          src="/images/signin.jpeg"
          alt="Sign In Illustration"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </div>
  );
}
