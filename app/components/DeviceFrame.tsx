import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  device: "phone" | "laptop";
};

export default function DeviceFrame({ src, alt, device }: Props) {
  if (device === "phone") {
    return (
      <div className="relative w-full max-w-[156px] rounded-[2.25rem] bg-[#1c1c1e] p-[7px] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[804/1748] overflow-hidden rounded-[1.85rem] bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="156px"
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[350px] flex-col items-center">
      <div className="w-full rounded-t-xl bg-[#1c1c1e] p-[7px] pb-0 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)]">
        {/* 16:10, matching a MacBook display */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-md bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="350px"
            className="object-cover"
          />
        </div>
      </div>
      {/* base, slightly wider than the lid, with the hinge notch */}
      <div className="relative h-[9px] w-[108%] rounded-b-lg bg-[#c9ced3] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-0 h-[3px] w-[54px] -translate-x-1/2 rounded-b-full bg-[#a9b0b6]" />
      </div>
    </div>
  );
}
