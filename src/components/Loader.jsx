import './Loader.css';

function Loader({ progress }) {
    return (
        <div className="loader">
            <div className="loader__logo">
                <img src="/logo.png" alt="MATCHA MATCHA" className="loader__image" />
            </div>
            <div className="loader__progress">
                <div
                    className="loader__bar"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="loader__text">Loading experience...</p>
        </div>
    );
}

export default Loader;
