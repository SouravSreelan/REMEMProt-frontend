"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import speciesData from "@/constants/data.json";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import React, { useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { fetcher } from "@/lib/utils";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { url } from "@/constants";
ChartJS.register(ArcElement, Tooltip, Legend);

// import { cookies } from 'next/headers'

const Browse = () => {
  const [species, setSpecies] = useState("");
  const [method, setMethod] = useState("");
  const [tissue, setTissue] = useState("");
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState([]);
  const [cells, setCells] = useState([]);

  const chartData = speciesData.browseGraph.map((item) => {
    const labels = item.data.map((dataPoint) => dataPoint.name);
    const values = item.data.map((dataPoint) => dataPoint.value);
    const backgroundColors = values.map((_, index) => {
      const baseHue = index * 187.5;
      const hue = (baseHue + 30) % 360;
      const saturation = 50 + ((index * 10) % 50);
      const lightness = 50 + ((index * 10) % 50);
      const opacity = 0.7; // You can adjust opacity as needed
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
    });

    return {
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors,
        },
      ],
      labels: labels,
      species: item.species,
    };
  });

  const handleSelectSpecies = async (e: string) => {
    setSpecies(e);

    const postData = {
      selectedSpecies: e,
    };
    // const postData = new URLSearchParams();
    // postData.append('selectedSpecies', e);
    try {
      setLoading(true);

      const data = await fetcher(`${url}/RememProt/selectedSpecies/`, postData);
      if (data.methods) {
        setMethods(data.methods);
        setLoading(false);
      }

      // )
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSelectMethod = async (e: string) => {
    setMethod(e);

    const postData = {
      selectedSpecies: species,
      methodSelect: e,
    };
    try {
      setLoading(true);
      const data = await fetcher(`${url}/RememProt/selectedMethod/`, postData);
      if (data.cells) {
        setCells(data.cells);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "right",
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <>
      {loading && <Spinner />}
      <div className=" justify-center">
        <div className="max-w-[85rem]  px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">
              Browse
            </h2>
            {/* <p className='text-md font-normal max-w-9xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p> */}
          </div>
          <div className="">
            <Card className="bg-slate-200 ">
              <CardHeader>
                <CardTitle>Select</CardTitle>
                {/* <CardDescription>
                                    give some text here
                                </CardDescription> */}
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-2  gap-4">
                  <div className="grid gap-2">
                    <>
                      <Label htmlFor="species">Species</Label>
                      <Select
                        onValueChange={(value) => handleSelectSpecies(value)}
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
                    </>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="species">Choose an enrichment method</Label>
                    <Select
                      onValueChange={(value) => handleSelectMethod(value)}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue
                          placeholder={
                            species ? "Select" : "Please select a method"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full" position="popper">
                        {methods.map((met, index) => (
                          <SelectItem key={index} value={met}>
                            {met}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Tissue/Cell line</Label>
                  <Select onValueChange={(value) => setTissue(value)}>
                    <SelectTrigger id="framework">
                      <SelectValue
                        placeholder={
                          method ? "Select" : "Please select a tissue/cell line"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full" position="popper">
                      {cells.map((met, index) => (
                        <SelectItem key={index} value={met}>
                          {met}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-2">
                <Button variant="ghost">Reset</Button>
                <Link
                  href={{
                    pathname: "/browse/result",
                    query: { species, method, tissueCell: tissue },
                  }}
                >
                  <Button
                    type="submit"
                    disabled={!species || !method || !tissue}
                  >
                    Submit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <div className="justify-center grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-2 gap-4">
          {chartData.map((item, index) => (
            <div className="max-w-5xl mx-auto h-auto w-[30rem]" key={index}>
              <h1 className="font-bold text-2xl text-center">{item.species}</h1>
              <Doughnut data={item} options={options} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Browse;
