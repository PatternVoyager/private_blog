import './globals.css';

export default function HomePage () {
    return (
        <>
            <div className="header">
                <h1>Hello World, <span>this is Azmi</span></h1>
            </div>
            <figure className="profile-card">
                <div className="photo-frame">
                    <img src="img/empty_profile.png" alt="Foto Muhammad Azmi Fatani" />
                </div>
                <figcaption className="description">
                    Hello everyone! i am Muhammad Azmi Fatani, a junior Web Developer & senior Reverse Engineer 
                </figcaption>
            </figure>
        </>
    )
}
