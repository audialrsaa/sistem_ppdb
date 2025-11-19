"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Fasilitas() {
  const fasilitas = [
    { nama: "Ruang Kelas", img: "/images/fasilitas/ruang kelas.jpg" },
    { nama: "Kantin", img: "/images/fasilitas/kantin.jpg" },
    { nama: "Musholla", img: "/images/fasilitas/musholla.png" },
    { nama: "Taman", img: "/images/fasilitas/taman.jpg" },
    { nama: "Lapangan", img: "/images/fasilitas/lapangan.png" },
    { nama: "Pendopo", img: "/images/fasilitas/pendopo.png" },
    { nama: "Ruang Broadcast", img: "/images/fasilitas/podcast.png" },
    { nama: "Studio Broadcast", img: "/images/fasilitas/studiobroad.png" },
    { nama: "Studio Animasi", img: "/images/fasilitas/studioanim.png" },
    { nama: "Ruang RPL", img: "/images/fasilitas/rpsrpl.png" },
    { nama: "Data Center", img: "/images/fasilitas/dacen.png" },
    { nama: "RPS TEI", img: "/images/fasilitas/rpstei.png" },
    { nama: "Lift", img: "/images/fasilitas/lift.png" },
    { nama: "Creative Center", img: "/images/fasilitas/creativecenter.png" },
  ];

  return (
    <div className="w-full py-16 bg-white -mb-18">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Fasilitas Sekolah
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto px-4">
          Fasilitas belajar modern untuk mendukung prestasi akademik dan pengembangan karakter
        </p>
      </div>

      {/* carousel */}
      <div className="max-w-6xl mx-auto px-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4 mb-12">
            {fasilitas.map((item, i) => (
              <CarouselItem
                key={i}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img
                        src={item.img}
                        alt={item.nama}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <p className="text-center font-semibold text-gray-800">
                      {item.nama}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-2 md:left-4" />
          <CarouselNext className="right-2 md:right-4" />
        </Carousel>
      </div>
    </div>
  );
}