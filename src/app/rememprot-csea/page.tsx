"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import speciesData from "@/constants/data.json";
import Link from "next/link";

const REMEMProtCSEA = () => {
  const [species, setSpecies] = useState("Homo sapiens");
  const [sampleText, setSampleText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoadSample = () => {
    const selectedSpeciesData = speciesData.rememProtData.find(
      (item) => item.species === species
    );
    if (selectedSpeciesData) {
      const sampleData = selectedSpeciesData.genes.map((gene) => gene.name);
      setSampleText(sampleData.join("\n"));
    } else {
      // Handle the case when selectedSpeciesData is not found
      console.error("Selected species data not found");
    }
  };

  const handleSubmit = (e) => {
    if (!sampleText.trim()) {
      setErrorMessage("Please enter gene symbol.");
      e.preventDefault(); // Prevent form submission
      return;
    }

    setErrorMessage("");
    // Proceed with submitting data
  };
  return (
    <div className="flex justify-center">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight lg:mb-10 dark:text-white">
            REMEMProt-CSEA
          </h2>
          <p className="text-md font-normal text-justify max-w-9xl">
            {" "}
            The enrichment analysis using the REMEMProt-CSEA enables the
            visualization of a set of query proteins if <i> a priori </i> is
            identified in a particular experimental/biological context. This
            also enables the users to cross-refer to enrichment methods,
            profiling/differential expression, and biological contexts such as
            disease, organism, and cell line/tissue source for their protein of
            interest.
          </p>
        </div>
        <Card className="bg-slate-200 max-w-xl mx-auto ">
          <CardHeader>
            <CardTitle className="text-xl">Enter Gene Symbol :</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-col w-full gap-2 max-w-xl mx-auto">
              <div className="mb-5">
                <Label htmlFor="species">Species</Label>
                <Select
                  onValueChange={(value) => setSpecies(value)}
                  defaultValue="Homo sapiens"
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>

                  <SelectContent className="w-full" position="popper">
                    {speciesData.species.map((species) => (
                      <SelectItem key={species.id} value={species.name}>
                        {" "}
                        {species.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Input Gene Symbol / Gene Symbol set here."
                className="min-h-[20rem] rounded-xl"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-600 text-center">{errorMessage}</p>
              )}
              <div className="flex justify-end  gap-2 mt-5">
                <Button onClick={handleLoadSample}>Load Sample</Button>
                <Link
                  href={{
                    pathname: "/rememprot-csea/result",
                    query: { species, analysisInput: sampleText },
                  }}
                >
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default REMEMProtCSEA;
