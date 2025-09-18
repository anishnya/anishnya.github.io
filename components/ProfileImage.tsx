import Image from 'next/image';

const ProfileImage = (): JSX.Element => {
    return (
        <Image
            className="rounded-full select-none transition-all pointer-events-none"
            src="/images/anish-alt.jpg"
            // onMouseOver = {e => e.currentTarget.src = "/images/gelo.HEIC"}
            // onMouseOut = {e => e.currentTarget.src = "/images/me.jpg"}
            draggable={false}
            alt="Anish Nyayachavadi Profile Image"
            width={260}
            height={260}
        />
    );
};

export default ProfileImage;
