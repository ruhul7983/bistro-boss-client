const Cover = ({ img, heading, subheading }) => {
    return (
        <div
            className="hero  h-[600px]"
            style={{
                backgroundImage: `url(${img})`,
                backgroundAttachment: "fixed"
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="md:px-80 md:py-14" style={{
                    background: "linear-gradient(0deg, rgba(21, 21, 21, 0.70) 0%, rgba(21, 21, 21, 0.70) 100%)",

                }}>
                    <h1 className="md:mb-5 md:text-5xl text-2xl font-bold text-white uppercase">{heading}</h1>
                    <p className="md:mb-5 text-white font-thin">
                        {subheading}
                    </p>
                </div>
            </div>
            
        </div>
    );
};

export default Cover;