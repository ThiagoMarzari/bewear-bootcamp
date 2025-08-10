import Image from "next/image";

type PartnerBrandsProps = {
  title: string;
  image: string;
};

const partnerBrands: PartnerBrandsProps[] = [
  {
    title: "Nike",
    image: "/nike.svg",
  },
  {
    title: "Adidas",
    image: "/adidas.svg",
  },
  {
    title: "Puma",
    image: "/puma.svg",
  },
  {
    title: "New balance",
    image: "/newb.svg",
  },
  {
    title: "Converse",
    image: "/converse.svg",
  },
  {
    title: "Polo",
    image: "polo.svg",
  },
  {
    title: "Zara",
    image: "zara.svg",
  },
];

export function PartnerBrandList() {
  return (
    <div className="space-y-6">
      <h3 className="px-5 text-2xl font-semibold md:text-3xl lg:px-8 lg:text-4xl">
        Marcas parceiras
      </h3>
      <div className="flex w-full gap-5 overflow-x-auto px-5 lg:px-8 [&::-webkit-scrollbar]:hidden">
        {partnerBrands.map((brand) => (
          <div
            key={brand.title}
            className="flex w-24 min-w-24 flex-col items-center gap-2 md:w-28 md:min-w-28 lg:w-32 lg:min-w-32"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border bg-white/50 backdrop-blur-sm transition-colors hover:border-black/50 md:h-28 md:w-28 lg:h-32 lg:w-32">
              <Image
                src={brand.image}
                alt={brand.title}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <p className="text-center text-xs font-medium md:text-sm lg:text-base">
              {brand.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
