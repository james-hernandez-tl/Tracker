import React from "react";
import getUsersMoods from "../serverFunctions/getUsersMoods";
import createUserMood from "../serverFunctions/createUserMood";

export default async function Grid() {
  const allMoods: any = await getUsersMoods();
  const mood = await createUserMood("happy", new Date());

  console.log("return me", allMoods);
  console.log("mood", mood);
  return <div></div>;
}

// return new Date(year, month, 0).getDate();
