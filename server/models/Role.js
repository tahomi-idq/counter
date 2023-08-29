import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
    value: {type: String, unique: true, default: "READER"},
})

export const Role = model('Role', RoleSchema);