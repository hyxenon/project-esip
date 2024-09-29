"use server";

import { db } from "@/lib/db";

export const handlePurchase = async (
  userId: string,
  paperId: string,
  paymentLink: string
) => {
  try {
    const exisitingPurchase = await existingPurchase(userId, paperId);

    if (exisitingPurchase) {
      await db.paperPurchase.delete({
        where: { id: exisitingPurchase.id },
      });
    }

    const newPurchase = await db.paperPurchase.create({
      data: {
        userId,
        paperId,
        paymentLink,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const existingPurchase = async (userId: string, paperId: string) => {
  const exisitingPurchase = await db.paperPurchase.findUnique({
    where: { userId_paperId: { userId, paperId } },
  });

  return exisitingPurchase;
};

// export const checkHavePurchase = async (
//   userId: string,
//   paperId: string,
//   paymentLink: string
// ) => {
//   const exisitingPurchase = await existingPurchase(userId, paperId);

//   if (exisitingPurchase) {
//     const url = `https://api.paymongo.com/v1/links/${paymentLink}`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         authorization: "Basic c2tfdGVzdF9iQXZrQnRYemNBOEVjSHlxYTl1YVNTOFE6",
//       },
//     };
//   }
// };
