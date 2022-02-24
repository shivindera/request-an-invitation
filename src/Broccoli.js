// Parent Broccoli component (can be used to define Context, Routes. etc in the future)

import Header from './components/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer';

function Broccoli() {
  return (
    <div className='broccoli-and-co'>
      <Header></Header>
      <Homepage></Homepage>
      <Footer></Footer>
    </div>
  );
}

export default Broccoli;
