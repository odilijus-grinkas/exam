import { Link } from 'react-router-dom';

export default function LinkButton({title, path}){
  return (
    <Link className="btn btn-light nav-link rounded-0 py-2" to={path}>
      {title}
    </Link>
  )
}