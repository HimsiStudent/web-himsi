import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image
        src="/LOGO-HIMSI.webp"
        alt="Logo HIMSI"
        className="logo"
        width={100}
        height={100}
        priority={true}
      />
    </>
  );
}
