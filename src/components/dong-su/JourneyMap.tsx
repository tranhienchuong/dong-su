type JourneyMapProps = {
  mapImage: string;
  title?: string;
  description?: string;
};

export function JourneyMap({
  mapImage,
  title = "Bản đồ hành trình đầu đời",
  description = "Từ ruộng nghèo, chùa Hoàng Giác, đường phiêu bạt đến doanh trại nghĩa quân.",
}: JourneyMapProps) {
  return (
    <section className="dong-su-panel overflow-hidden rounded-md">
      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
        <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[26rem]">
          <img
            alt={title}
            className="absolute inset-0 size-full scale-110 object-cover object-[30%_center]"
            src={mapImage}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/35 to-black/95" />
          <div className="absolute inset-y-0 right-0 w-44 bg-gradient-to-r from-transparent via-black/70 to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 dong-su-vignette" />
          <div className="absolute inset-0 dong-su-dust" />
        </div>

        <div className="relative z-10 flex flex-col justify-center border-t border-old-gold/20 bg-black/80 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:bg-charcoal/95">
          <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
            Hành trình
          </p>
          <h2 className="dong-su-text-shadow mt-3 font-serif text-4xl leading-tight text-faded-gold">
            {title}
          </h2>
          <p className="mt-4 leading-8 text-stone-300">{description}</p>
        </div>
      </div>
    </section>
  );
}
