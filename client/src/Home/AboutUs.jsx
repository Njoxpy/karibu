import { FaRocket, FaLightbulb } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white px-6 pt-14 lg:px-8 font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading ya Kuhusu Sisi */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600">Kuhusu Sisi</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Katika Savarrah, tumejizatiti kutoa suluhisho bunifu ambazo
            zinainua biashara. Dhamira yetu ni kuunda ushirikiano wa kudumu
            na kutoa huduma ambazo zinachangia mafanikio ya wateja wetu.
          </p>
        </div>

        {/* Dhamira & Maono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg flex items-start transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <FaRocket className="text-blue-600 text-3xl mr-4" />
            <div>
              <h3 className="text-3xl font-extrabold text-blue-600">
                Dhamira Yetu
              </h3>
              <p className="mt-4 text-gray-700">
                Dhamira yetu ni kutoa bidhaa na huduma bora kwa kuzingatia
                kuridhika kwa mteja, uvumbuzi endelevu, na ustahimilivu.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-lg flex items-start transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <FaLightbulb className="text-blue-600 text-3xl mr-4" />
            <div>
              <h3 className="text-3xl font-extrabold text-blue-600">
                Maono Yetu
              </h3>
              <p className="mt-4 text-gray-700">
                Kuwa kiongozi wa kimataifa katika sekta yetu, maarufu kwa
                kuhamasisha biashara na kukuza ukuaji endelevu kupitia suluhisho
                za kimkakati na utoaji wa huduma za hali ya juu.
              </p>
            </div>
          </div>
        </div>

        {/* Kitufe cha Jifunze Zaidi */}
        <div className="flex justify-center">
          <button className="inline-block text-center bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-md hover:bg-blue-500 mt-8 transition-all duration-300 ease-in-out transform hover:scale-105">
            Jifunze Zaidi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
