//we define a schema to validate the request body

import { Static, Type } from "@sinclair/typebox";

export const planetSchema = Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    diameter: Type.Integer(),
    moons: Type.Integer()
}, { additionalProperties: false});


//we can infer a type from the planet schema: PlanetData type
export type planetData = Static<typeof planetSchema>;

