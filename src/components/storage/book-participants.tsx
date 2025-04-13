"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ParticipantsType{
    onChange: (e: any) => void;
    value: string
}

export default function BookParticipants({onChange, value}:  ParticipantsType) {
  

  return (
    <div>
      <Label className="text-white font-light text-[12px]">How many other participants are attending?</Label>
      <Input
        type="number"
        className="rounded-lg  h-10 bg-transparent border-[#595B5C] text-white"
        value={value}
        onChange={onChange}
      ></Input>
    </div>
  );
}
