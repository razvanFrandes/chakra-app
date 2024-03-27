import Image from "next/image";
import Link from "next/link";
import IcoFlower from "@/components/assets/icoFlower";
import IcoPerson from "@/components/assets/IcoPerson";
import { Typography, Button } from "@mui/material";
import NavUser from "@/components/_x/NavUser";
export default function HomePage() {
  return (
    <>
      <NavUser />
      <main>
        <section className="relative flex items-center px-8">
          <div className="gradient_1 w-full mx-auto max-w-[1600px] rounded-lg py-12 relative">
            <div className="container relative">
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-6">
                  <Typography variant="h1">Hope</Typography>
                  <Typography>
                    Discover the power of disciplined routines, embrace
                    self-care, and build unshakeable confidence.
                  </Typography>
                  <div className="mt-8 flex gap-5">
                    <Button variant="contained">
                      <Link href="/login">Get Started</Link>
                    </Button>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="w-[500px] min-h-[500px] relative ml-auto">
                    <div className="absolute top-0 left-0 right-0 ">
                      <Image
                        src="/assets/hero_1.svg"
                        className=" object-contain object-center"
                        alt="Step 1"
                        width={500}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 relative ">
          <div className="container">
            <div className="text-center">
              <Typography variant="h2">
                Universe <br />
                is within you
              </Typography>

              <p className="mt-8 text-xl font-medium">
                Navigate the celestial pathways to well-being and balance with{" "}
                <b>3 simple steps</b>.
              </p>
            </div>
            <div className="mt-16  grid grid-cols-12 lg:gap-0 xl:gap-12">
              <div className="col-span-4">
                <div className="space-y-5 bg-white text-center">
                  <h3 className="font-black mb-3">1</h3>
                  <p className="text-4xl font-bold">
                    Discover Your <br /> Path
                  </p>
                  <div className="bg-gradient-to-br   p-2 rounded-md">
                    <Image
                      src="/assets/image_1.png"
                      className="rounded-md h-[300px] object-cover object-top  border border-white"
                      alt="Step 1"
                      width={500}
                      height={100}
                    />
                  </div>
                  <div className="mt-7 space-y-5 px-5">
                    <p className="text-lg font-bold">
                      Start your journey and select the chakra you wish to
                      nurture.
                    </p>
                    <p className="text-gray-500">
                      Whether it is grounding your roots or opening your heart,
                      begin your journey with intention.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-4 ">
                <div className="space-y-5 bg-white text-center">
                  <h3 className="font-black mb-3">2</h3>
                  <p className="text-4xl font-bold">
                    Engage and
                    <br /> Grow
                  </p>
                  <div className="bg-gradient-to-br   p-2 rounded-md">
                    <Image
                      src="/assets/image_2.png    "
                      className="rounded-md h-[300px] object-cover object-top border border-white"
                      alt="Step 1"
                      width={500}
                      height={100}
                    />
                  </div>
                  <div className="mt-7 space-y-5 px-5">
                    <p className="text-lg font-bold">
                      Choose from a curated collection of activities and
                      practices.
                    </p>
                    <p className="text-gray-500">
                      Engage with daily exercisses, meditative practices, and
                      insightful content at your own pace.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="space-y-5 bg-white text-center">
                  <h3 className="font-black mb-3">3</h3>
                  <p className="text-4xl font-bold">
                    Reflect and
                    <br /> Evolve
                  </p>
                  <div className="bg-gradient-to-br  p-2 rounded-md">
                    <Image
                      src="/assets/path_3_3.jpg"
                      className="rounded-md h-[300px] object-cover object-top  border border-white"
                      alt="Step 1"
                      width={500}
                      height={100}
                    />
                  </div>
                  <div className="mt-7 space-y-3 px-5">
                    <p className="text-lg font-bold">
                      Track your progress and witness your transformation.
                    </p>
                    <p className="text-gray-500">
                      Utilize the journal feature to reflect on your experiences
                      and watch your well-being flourish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-16">
              <Button>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-24 pt-0 relative">
          <div className="container relative bg-primary text-white rounded-md py-7">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-6">
                <div className="pl-12">
                  <h2 className="h1 text-4xl font-bold">
                    Begin Your Journey Today
                  </h2>
                  <p className="mt-6 text-xl font-medium leading-8">
                    Let each step on this path bring you closer to the serenity
                    and strength that lies within.
                  </p>
                  <div className="mt-8 flex gap-5">
                    <Button variant="secondary">
                      <Link href="/login">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <Image
                  src="/assets/image_4b.png"
                  className=" object-contain object-center "
                  alt="Step 1"
                  width={500}
                  height={100}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
