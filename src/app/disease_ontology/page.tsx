"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import speciesData from "@/constants/data.json";
import Link from "next/link";

const DiseaseOntology = () => {
  const [sampleText, setSampleText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);

    const filteredSuggestions = speciesData.disdose
      .filter((disease) =>
        disease.diseaseName.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 5)
      .map((disease) => disease.diseaseName);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ul className="suggestions-list items-center justify-center bg-white ms-10">
        {suggestions.map((suggestion, index) => (
          <li
            className="h-3/6 border-black hover:bg-gray-100"
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  //   const handleSearch = () => {
  //     console.log("Searching for:", searchText);
  //     window.location.href = `/disease_ontology/result?doseInput=${encodeURIComponent(
  //       searchText
  //     )}`;
  //   };

  const handleSearch = () => {
    if (!searchText.trim()) {
      setErrorMessage("Please enter a disease name.");
      return;
    }

    const foundDisease = speciesData.disdose.find(
      (disease) =>
        disease.diseaseName.toLowerCase() === searchText.toLowerCase()
    );

    if (foundDisease) {
      setErrorMessage("");
      window.location.href = `/disease_ontology/result?searchInput=${encodeURIComponent(
        searchText
      )}`;
    } else {
      setErrorMessage("Disease not found in the data.");
    }
  };

  const handleLoadSample = () => {
    const sampleData = speciesData.ex_disease_ontology.map((gene) => gene.name);
    setSampleText(sampleData.join("\n"));
  };

  const handleSubmit = () => {
    const userInputGenes = sampleText
      .trim()
      .split("\n")
      .map((gene) => gene.toLowerCase());
    console.log("User Input Genes:", userInputGenes);

    const foundGenes = userInputGenes.filter((userGene) =>
      speciesData.csea_new.some(
        (gene) => gene.genesymbol.toLowerCase() === userGene
      )
    );

    if (foundGenes.length > 0) {
      window.location.href = `/disease_ontology/result?doseInput=${encodeURIComponent(
        sampleText
      )}`;
    } else {
      console.error("Gene(s) not found in the data:", foundGenes);
      setErrorMessage2("Gene(s) not found in the data");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen/2">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
        <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-14 ">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight e lg:mb-10 dark:text-white">
            Disease Ontology
          </h2>
          <p className="text-md font-normal text-justify max-w-9xl lg:px-20 lg:mx-20">
            The disease ontology enrichment enables analysis of disease
            associations of the set of query proteins within the curated sets of
            proteins in REMEMProt. Protein-disease association can be visualized
            by a heat map.
          </p>
        </div>
        <div className="flex items-center justify-center mb-10">
          <Card className="bg-slate-200 max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Enter Disease Name :</CardTitle>
            </CardHeader>
            <div className="flex items-center justify-center mb-2">
              <input
                type="text"
                placeholder="Enter Disease name here."
                className="hidden md:flex border border-gray-300 p-2 ms-10 mr-4 rounded-md min-w-[28rem]"
                value={searchText}
                onChange={handleInputChange}
              />
              <Button
                className="hidden md:flex p-2 me-3 rounded-md cursor-pointer"
                onClick={handleSearch}
              >
                Search{" "}
              </Button>
            </div>
            <div className="items-center justify-center w-5/6">
              {renderSuggestions()}
            </div>
            <div className="flex items-center justify-center">
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-center mb-10">
          <p>OR</p>
        </div>
        <Card className="bg-slate-200 max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Enter Gene Symbol :</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-col w-full gap-2 max-w-xl mx-auto">
              <Textarea
                placeholder="Input Gene Symbol / Gene Symbol set here."
                value={sampleText}
                onChange={(e) => {
                  setSampleText(e.target.value);
                  setErrorMessage2("");
                }}
                className="min-h-[20rem]"
              />
              {errorMessage2 && <p className="text-red-600">{errorMessage2}</p>}
              <div className="flex justify-center gap-2 mt-5">
                <Button onClick={handleLoadSample}>Load Sample</Button>
                <Button onClick={handleSubmit} disabled={!sampleText}>
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseOntology;
