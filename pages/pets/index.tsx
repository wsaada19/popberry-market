import Layout from '@components/layouts/PageLayout';
import { Leaderboard } from '@components/leaderboards/Leaderboard';
import { getBlobStorageFile } from '@services/azure/blobStorage';
import { GetStaticProps } from 'next';
import Image from 'next/image';

type Pet = {
  name: string;
  tokenId: string;
  price: number;
  imageUrl: string;
  traits: {
    Luck: number;
    Speed: number;
    Strength: number;
    Smarts: number;
    Terrain: string;
    Head: string;
    Body: string;
    EyeColor: string;
    Eyes: string;
    Tail: string;
    TailColor: string;
    HeadColor: string;
    BodyColor: string;
    Edition: string;
  };
  stage: string;
  currentOwner: string;
};

export default function PetSales({ pets }: { pets: Pet[] }) {
  return (
    <Layout description="Pixels Online pet sales." title="Popberry Analytics | Pet Sales">
      <h1 className="text-lg mb-2">Pet Sales</h1>
      <div className="grid grid-cols-2">
        {pets.slice(0, 30).map((p) => (
          <div className="flex mb-2 mx-auto" key={p.tokenId}>
            <Image src={p.imageUrl} width={200} height={200} alt={`Pet named ${p.name}`} />
            <div>
              <p className="px-4 text-base font-semibold">{p.name}</p>
              <div className="px-4 py-1">
                <Image
                  className="inline-block mr-1"
                  src="/images/ron.png"
                  alt="Ronin Logo"
                  width={14}
                  height={14}
                />
                {p.price}
              </div>
              <div className="mt-14 text-sm">
                <p className="px-4">{`Luck: ${Math.round(p.traits.Luck)}`}</p>
                <p className="px-4">{`Speed: ${Math.round(p.traits.Speed)}`}</p>
                <p className="px-4">{`Strength: ${Math.round(p.traits.Strength)}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Leaderboard
        players={pets.map((p) => ({
          playerId: p.tokenId,
          name: p.name,
          scores: [p.price],
        }))}
        labels={['Price']}
      /> */}
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const pets = (await getBlobStorageFile('pixels-data', 'formatted_pet_sales.json'))
    .results as Pet[];
  const pets_formatted = pets.map((p) => ({
    name: p.name,
    tokenId: p.tokenId,
    price: p.price,
    imageUrl: p.imageUrl,
    traits: p.traits || {
      Luck: 0,
      Speed: 0,
      Strength: 0,
      Smarts: 0,
      Terrain: '',
      Head: '',
      Body: '',
      EyeColor: '',
      Eyes: '',
      Tail: '',
      TailColor: '',
      HeadColor: '',
      BodyColor: '',
      Edition: '',
    },
    stage: p.stage,
    currentOwner: p.currentOwner,
  }));
  return { props: { pets: pets_formatted } };
}) satisfies GetStaticProps<{
  pets: Pet[];
}>;
