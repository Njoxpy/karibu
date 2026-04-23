import customer from "../assets/images/male1.jpg";
import customer2 from "../assets/images/female.jpg";
import Godbless from "../assets/images/jefrey.jpg";

const Testimonials = () => {
  return (
    <section className="bg-gray-50 px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">
          Soma maoni ya kuaminika kutoka kwa wateja wetu
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {[
            {
              image: customer,
              alt: "Maoni ya mteja wa kiume",
              text: "karibu imebadilisha kabisa jinsi tunavyosimamia shughuli zetu. Kuanzia siku ya kwanza, timu ilitoa msaada wa kipekee, ikitusaidia kuelewa na kutekeleza mfumo kwa urahisi. Muundo wa jukwaa ulio rahisi kutumia na zana bora zimetuwezesha kupunguza muda wa kazi zinazojirudia na kujikita zaidi katika kukuza biashara yetu.",
            },
            {
              image: customer2,
              alt: "Maoni ya mteja wa kike",
              text: "Huduma ya Kulisha Wanyama ya karibu imebadilisha kabisa shughuli za shamba letu. Kabla ya kuitumia, kufuatilia hesabu ya malisho na kusimamia maagizo kulikuwa na changamoto na kuchukua muda. Sasa, mchakato ni rahisi sana—wafanyakazi wanaweza kuweka maagizo haraka, na tunaweza kufuatilia kila kitu kwa wakati halisi.",
            },
            {
              image: Godbless,
              alt: "Maoni ya msimamizi",
              text: "Vipengele vya Vifaa vya Ofisi na Godown kwenye jukwaa la karibu ni kile haswa timu yetu ilihitaji kurahisisha shughuli. Kama msimamizi, ninaweza kupakia bidhaa mpya haraka, kufanya masasisho, na kufuatilia maagizo bila wasiwasi wa makosa au ucheleweshaji. Wafanyakazi wetu pia wanapenda jinsi ilivyo rahisi kuweka maagizo na kuona hali ya maombi yao.",
            },
          ].map((testimonial, index) => (
            <blockquote
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="text-sm font-medium text-gray-800">
                  Mteja {index + 1}
                </div>
              </div>
              <p className="mt-4 text-gray-600 italic">{testimonial.text}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
