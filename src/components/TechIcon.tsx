import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiPython, 
  SiTensorflow, 
  SiPytorch, 
  SiFastapi, 
  SiNextdotjs, 
  SiSolidity,
  SiOpenai,
  SiTypescript,
  SiNpm,
  SiDjango,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiPandas,
  SiScikitlearn,
  SiExpress,
  SiNumpy,
  SiApacheairflow
} from 'react-icons/si'
import { FaAws, FaDatabase } from 'react-icons/fa'
import { DiRedis, DiSpark } from 'react-icons/di'

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    'React': <SiReact className={className} color="#61DAFB" />,
    'Node.js': <SiNodedotjs className={className} color="#339933" />,
    'NodeJS': <SiNodedotjs className={className} color="#339933" />,
    'Express': <SiExpress className={className} />,
    'MongoDB': <SiMongodb className={className} color="#47A248" />,
    'Python': <SiPython className={className} color="#3776AB" />,
    'TensorFlow': <SiTensorflow className={className} color="#FF6F00" />,
    'PyTorch': <SiPytorch className={className} color="#EE4C2C" />,
    'FastAPI': <SiFastapi className={className} color="#009688" />,
    'Next.js': <SiNextdotjs className={className} />,
    'Web3': <SiSolidity className={className} color="#363636" />,
    'Solidity': <SiSolidity className={className} color="#363636" />,
    'LangChain': <SiOpenai className={className} />, // Stand-in for LangChain
    'OpenAI': <SiOpenai className={className} />,
    'Typescript': <SiTypescript className={className} color="#3178C6" />,
    'TypeScript': <SiTypescript className={className} color="#3178C6" />,
    'NPM': <SiNpm className={className} color="#CB3837" />,
    'Django': <SiDjango className={className} color="#092E20" />,
    'PostgreSQL': <SiPostgresql className={className} color="#336791" />,
    'Vanilla JS': <SiJavascript className={className} color="#F7DF1E" />,
    'VanillaJS': <SiJavascript className={className} color="#F7DF1E" />,
    'HTML5': <SiHtml5 className={className} color="#E34F26" />,
    'Tailwind CSS': <SiTailwindcss className={className} color="#06B6D4" />,
    'Tailwind': <SiTailwindcss className={className} color="#06B6D4" />,
    'Pandas': <SiPandas className={className} color="#150458" />,
    'Scikit-Learn': <SiScikitlearn className={className} color="#F7931E" />,
    'Numpy': <SiNumpy className={className} color="#013243" />,
    'Matplotlib': <SiPython className={className} color="#11557c" />, // No direct si icon
    'SQL': <FaDatabase className={className} color="#00758F" />,
    'Airflow': <SiApacheairflow className={className} color="#017CEE" />,
    'Redis': <DiRedis className={className} color="#DC382D" />,
    'AWS': <FaAws className={className} color="#FF9900" />,
    'Spark': <DiSpark className={className} color="#E25A1C" />
  };

  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    return null; // Return nothing if tech doesn't perfectly match (can add generic code icon if needed)
  }
  
  return <>{IconComponent}</>;
}
