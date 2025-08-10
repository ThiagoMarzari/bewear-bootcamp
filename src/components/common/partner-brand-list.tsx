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
      <h3 className="px-5 text-2xl font-semibold md:text-3xl">
        Marcas parceiras
      </h3>
      <div className="flex w-full gap-5 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {partnerBrands.map((brand) => (
          <div key={brand.title} className="flex flex-col items-center gap-2">
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl border md:w-42">
              <Image
                src={brand.image}
                alt={brand.title}
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium">{brand.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
