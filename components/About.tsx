import Image from 'next/image';
import ExtLink from './ExtLink';
import ProfileImage from './ProfileImage';
import personalInfo from './data/personalInfo.json'

const About = (): JSX.Element => {
	return (
		<section className="grid gap-12" id="about">
			<div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-8">
				<div className="flex-shrink-0 scale-[0.90] sm:scale-100 transform-gpu origin-center rounded-md transition-transform duration-200 -translate-y-[5%] sm:translate-y-0">
					<ProfileImage></ProfileImage>
				</div>
				<div className="flex flex-col justify-center items-center sm:items-start max-w-xl w-full gap-4">
					<h1 className="text-4xl font-bold">{personalInfo.name}</h1>
					{/* Bio Section */}
					<div className="">
						<p>
							Under Construction...
						</p>
						<p>
							However for the curious, I enjoy hiking, sailing, and astrophotography during my free time. See you soon :)
						</p>
						{/* <p>
							I am a {personalInfo.about.year} PhD student
							in <ExtLink href= {personalInfo.about.department.link}>{personalInfo.about.department.name} </ExtLink>
							at <ExtLink href= {personalInfo.about.college.link}>{personalInfo.about.college.name} </ExtLink> 
							advised by <ExtLink href={personalInfo.about.advisor.link}> {personalInfo.about.advisor.name}. </ExtLink>
							<br/><a className = "text-sm">✉️ {personalInfo.about.email}</a>
						</p> */}
						{/* <p className = "text-sm text-gray-600">
							Research Interest: {personalInfo.about.interest}
						</p>
						<p className = "text-sm text-gray-400">
							Under construction......<br/>
							Re-architecting this site with some modern web technologies.
						</p> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
