// Components
import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbOfQZ-LhkRa40zhwlae_IEqaqM1iFR21HAw&s"
      alt="Logo"
      width={100}
      height={32}
      priority
    />
  );
};
