import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import "./CareerYouNeed.css";
import Images from "../../assets/images/Image";

const CareerYouNeed = ({ formData, setFormData }) => {
    const [selectedCareer, setSelectedCareer] = useState(formData?.career || "ENGINEER");
    const [activeIndex, setActiveIndex] = useState(0);

    const careers = [
        { title: "ENGINEER", subtitle: "Civil & Construction", image: Images.ErrorImage },
        { title: "ARCHITECT", subtitle: "Interior & Landscape", image: Images.ErrorImage },
        { title: "PHP DEVELOPER", subtitle: "Software & Games", image: Images.ErrorImage },
        { title: "DATA SCIENTIST", subtitle: "AI & ML", image: Images.ErrorImage },
        { title: "GRAPHIC DESIGNER", subtitle: "UI/UX & Branding", image: Images.ErrorImage },
        { title: "ENGINEER1", subtitle: "Civil & Construction", image: Images.ErrorImage },
        { title: "ARCHITECT1", subtitle: "Interior & Landscape", image: Images.ErrorImage },
        { title: "PHP DEVELOPER1", subtitle: "Software & Games", image: Images.ErrorImage },
        { title: "DATA SCIENTIST1", subtitle: "AI & ML", image: Images.ErrorImage },
        { title: "GRAPHIC DESIGNER1", subtitle: "UI/UX & Branding", image: Images.ErrorImage }
    ];

    const handleclick = (item) => {
        setSelectedCareer(item);
        setFormData((prevData) => ({
            ...prevData,
            career: item
        }));
    };

    return (
        <>
            <p className="text-gray-700 text-end">step 1</p>
            <h1 className="text-3xl font-bold text-gray-900 text-center mt-12">
                What kind of Career You Need?
            </h1>
            <p className="text-gray-500 text-center mb-8">
                Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas
            </p>

            <div className="flex items-center justify-center gap-6">
                <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white p-5 transition swiper-button-prev ${activeIndex === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#29ABE2] cursor-pointer"}`}
                    onClick={() => setActiveIndex(prev => Math.max(prev, 0))}
                    disabled={activeIndex === 0}
                >

                </button>

                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className=""
                >
                    {careers.map((career) => (
                        <SwiperSlide key={career.title}>
                            <div
                                onClick={() => handleclick(career.title)}
                                className={`border-2 rounded-lg p-6 cursor-pointer transition ${selectedCareer === career.title ? "border-[#29ABE2]" : "border-gray-300"
                                    }`}
                            >
                                <div className="flex justify-end mt-2">
                                    <input type="radio" checked={selectedCareer === career.title} readOnly className="hidden peer" />
                                    <label className="w-5 h-5 block rounded-full border-2 border-gray-300 peer-checked:border-[#29ABE2] peer-checked:bg-[#29ABE2]"></label>
                                </div>
                                <img
                                    src={career.image}
                                    alt={career.title}
                                    className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
                                    onError={(e) => e.target.src = "/images/error-placeholder.png"}
                                />
                                <h3 className="font-bold text-lg text-center">{career.title}</h3>
                                <p className="text-gray-500 text-sm text-center">{career.subtitle}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white p-5 transition swiper-button-next ${activeIndex === careers.length - 2 ? "bg-gray-400 cursor-not-allowed" : "bg-[#29ABE2] cursor-pointer"}`}
                    onClick={() => setActiveIndex(prev => Math.min(prev + 1, careers.length - 1))}
                    disabled={activeIndex === careers.length - 1}
                >
                </button>
            </div>
            <div className="w-full flex items-center justify-center my-4">
                <div className="relative w-2/3 h-2 bg-gray-300 rounded-full">
                    <div
                        className="absolute h-2 bg-[#29ABE2] rounded-full transition-all"
                        style={{ width: `${((activeIndex + 1) / careers.length) * 100}%` }}
                    ></div>
                    <div
                        className="absolute w-4 h-4 bg-[#29ABE2] rounded-full transition-all"
                        style={{ left: `calc(${((activeIndex + 1) / careers.length) * 100}% - 8px)`, top: "-4px" }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default CareerYouNeed;



