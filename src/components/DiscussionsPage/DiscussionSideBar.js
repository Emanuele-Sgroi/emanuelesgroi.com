"use client";

import React from "react";
import Image from "next/image";

const avatars = [
  {
    name: "a",
    type: "adventurer",
    url: "https://api.dicebear.com/9.x/adventurer/svg?seed=a&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "b",
    type: "avataaars",
    url: "https://api.dicebear.com/9.x/avataaars/svg?seed=b&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "c",
    type: "big-ears",
    url: "https://api.dicebear.com/9.x/big-ears/svg?seed=c&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "d",
    type: "big-smile",
    url: "https://api.dicebear.com/9.x/big-smile/svg?seed=d&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "e",
    type: "croodles",
    url: "https://api.dicebear.com/9.x/croodles/svg?seed=e&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "f",
    type: "identicon",
    url: "https://api.dicebear.com/9.x/identicon/svg?seed=f&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "g",
    type: "pixel-art",
    url: "https://api.dicebear.com/9.x/pixel-art/svg?seed=g&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "h",
    type: "bottts",
    url: "https://api.dicebear.com/9.x/bottts/svg?seed=h&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "i",
    type: "micah",
    url: "https://api.dicebear.com/9.x/micah/svg?seed=i&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "j",
    type: "personas",
    url: "https://api.dicebear.com/9.x/personas/svg?seed=j&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "k",
    type: "adventurer",
    url: "https://api.dicebear.com/9.x/adventurer/svg?seed=k&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "l",
    type: "avataaars",
    url: "https://api.dicebear.com/9.x/avataaars/svg?seed=l&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "m",
    type: "big-ears",
    url: "https://api.dicebear.com/9.x/big-ears/svg?seed=m&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "n",
    type: "big-smile",
    url: "https://api.dicebear.com/9.x/big-smile/svg?seed=n&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "o",
    type: "croodles",
    url: "https://api.dicebear.com/9.x/croodles/svg?seed=o&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "p",
    type: "identicon",
    url: "https://api.dicebear.com/9.x/identicon/svg?seed=p&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "q",
    type: "pixel-art",
    url: "https://api.dicebear.com/9.x/pixel-art/svg?seed=q&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "r",
    type: "bottts",
    url: "https://api.dicebear.com/9.x/bottts/svg?seed=r&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "s",
    type: "micah",
    url: "https://api.dicebear.com/9.x/micah/svg?seed=s&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "t",
    type: "personas",
    url: "https://api.dicebear.com/9.x/personas/svg?seed=t&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "u",
    type: "adventurer",
    url: "https://api.dicebear.com/9.x/adventurer/svg?seed=u&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "a1",
    type: "adventurer",
    url: "https://api.dicebear.com/9.x/adventurer/svg?seed=a&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "b1",
    type: "avataaars",
    url: "https://api.dicebear.com/9.x/avataaars/svg?seed=b&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "c1",
    type: "big-ears",
    url: "https://api.dicebear.com/9.x/big-ears/svg?seed=c&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "d1",
    type: "big-smile",
    url: "https://api.dicebear.com/9.x/big-smile/svg?seed=d&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "e1",
    type: "croodles",
    url: "https://api.dicebear.com/9.x/croodles/svg?seed=e&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "f1",
    type: "identicon",
    url: "https://api.dicebear.com/9.x/identicon/svg?seed=f&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "g1",
    type: "pixel-art",
    url: "https://api.dicebear.com/9.x/pixel-art/svg?seed=g&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "h1",
    type: "bottts",
    url: "https://api.dicebear.com/9.x/bottts/svg?seed=h&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "i1",
    type: "micah",
    url: "https://api.dicebear.com/9.x/micah/svg?seed=i&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "j1",
    type: "personas",
    url: "https://api.dicebear.com/9.x/personas/svg?seed=j&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "k1",
    type: "adventurer",
    url: "https://api.dicebear.com/9.x/adventurer/svg?seed=k&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "l1",
    type: "avataaars",
    url: "https://api.dicebear.com/9.x/avataaars/svg?seed=l&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "m1",
    type: "big-ears",
    url: "https://api.dicebear.com/9.x/big-ears/svg?seed=m&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "n1",
    type: "big-smile",
    url: "https://api.dicebear.com/9.x/big-smile/svg?seed=n&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "o1",
    type: "croodles",
    url: "https://api.dicebear.com/9.x/croodles/svg?seed=o&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "p1",
    type: "identicon",
    url: "https://api.dicebear.com/9.x/identicon/svg?seed=p&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "q1",
    type: "pixel-art",
    url: "https://api.dicebear.com/9.x/pixel-art/svg?seed=q&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
  {
    name: "r1",
    type: "bottts",
    url: "https://api.dicebear.com/9.x/bottts/svg?seed=r&backgroundType=solid,gradientLinear&featuresProbability=50&glassesProbability=50&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4",
  },
];

const DiscussionSideBar = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      {/* Category */}
      <div className="flex flex-col gap-2 max-md:px-4">
        <p className="text-xs text-text-secondary font-semibold">Category</p>
        <div className="flex gap-2 items-center">
          <div className="center rounded-md bg-bg-extra p-1 text-lg">👋🏻</div>
          <p className="text-xs font-medium text-text-primary cursor-default hover:text-accent-extra hover:underline">
            Say-Hi
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-accent-border" />

      {/* Labels */}
      <div className="flex flex-col gap-2 max-md:px-4">
        <p className="text-xs text-text-secondary font-semibold">Labels</p>
        <p className="text-xs text-text-primary ">None yet</p>
      </div>

      <div className="w-full h-px bg-accent-border" />

      {/* Avatars */}
      <div className="flex flex-col gap-2 max-md:px-4">
        <p className="text-xs text-text-secondary font-semibold">
          Your Name = Cool Avatar
        </p>
        <div className="flex gap-1 items-center flex-wrap">
          {avatars.map((avatar, index) => (
            <Image
              key={index}
              src={avatar.url}
              alt="avatar"
              width={28}
              height={28}
              quality={100}
              className="w-[28px] h-[28px] rounded-full object-cover object-center border border-accent-border bg-like-bg-active z-10"
            />
          ))}
          <p className="font-xs text-text-primary">and more</p>
        </div>
        <p className="text-sm text-text-primary mt-2">
          Avatars generated by{" "}
          <a
            href="https://www.dicebear.com/"
            target="_blank"
            className="hover:underline font-semibold"
          >
            DiceBear
          </a>
        </p>
      </div>

      <div className="w-full h-px bg-accent-border" />

      <div className="flex flex-col gap-2 max-md:px-4">
        <p className="text-xs text-text-secondary font-semibold">
          What do you think of this idea?
        </p>
        <p className="text-sm text-text-primary font-semibold">
          Share your thoughts in the comments! 😉
        </p>
      </div>
    </div>
  );
};

export default DiscussionSideBar;
