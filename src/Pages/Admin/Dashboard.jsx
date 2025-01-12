import React from "react";
import LongsorList from "./LongsorList";

const Dashboard = () => {
  return (
    <div className="p-4 bg-white flex-grow rounded-lg shadow-lg">
      <div className="flex  items-center space-x-8 mb-4 ml-11">
        <img
          src="/longsor-ilustrasi.png"
          alt="ilustrasi2"
          className="max-w-screen-sm h-auto"
        />
        <div className="text-gray-700">
          <h1 className="text-5xl font-bold mb-6">
            Selamat datang di LongsorPost
          </h1>
          <p className="max-w-5xl">
            LongsorPost adalah sebuah platform yang memungkinkan pengguna untuk
            berbagi pengalaman terkait bencana tanah longsor. Melalui situs ini,
            pengguna dapat memposting laporan tentang bencana tanah longsor yang
            mereka saksikan, alami, atau dengar. Kami menyediakan ruang untuk
            berbagai informasi, seperti lokasi, tipe bencana, deskripsi
            kejadian, serta tanggal terjadinya longsor. Platform ini bertujuan
            untuk meningkatkan kesadaran masyarakat akan bahaya tanah longsor
            dan menjadi wadah untuk berbagi informasi penting dalam upaya
            mitigasi dan penanggulangan bencana.
          </p>
        </div>
      </div>

      <div className="mt-2">
        <LongsorList />
      </div>
    </div>
  );
};

export default Dashboard;
