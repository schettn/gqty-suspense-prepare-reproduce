import React from "react";
import { prepareReactRender, useQuery } from "./gqty";

const Sessions: React.FC = () => {
  const data = useQuery({
    suspense: true,
    prepare(helpers) {
      console.log("%c [prepare] calling sessions", "color: purple");
      helpers.query.sessions.forEach((s) => {
        s.__typename;
        s.user?.id;
        s.user?.name;
      });
    },
  });

  // Correct cache
  return <div>{data.sessions[0].user?.name || "No name"}</div>;

  // Correct cache
  return <pre>{JSON.stringify(data.sessions, null, 2)}</pre>;

  // Correct cache
  return <div>TODO</div>;

  // prepareReactRender fails with error
  //  Field "user" of type "User" must have a selection of subfields. Did you mean "user { ... }"?
  return (
    <div>
      {data.sessions.map((session, index) => (
        <div key={index}>{session.user?.name}</div>
      ))}
    </div>
  );
};

async function test() {
  console.log("Starting prepareReactRender...");

  try {
    const { cacheSnapshot } = await prepareReactRender(
      React.createElement(Sessions),
    );

    console.log(JSON.stringify(cacheSnapshot, null, 2));
  } catch (error) {
    console.error("Error during prepareReactRender:", error);
    process.exit(1);
  }
}

test();
