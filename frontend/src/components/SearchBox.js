import React, { useEffect} from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

const SearchBox = () => {

  let navigate = useNavigate();

  function paramsToObject(entries) {
    let result = {}
    for (let entry of entries) { // each 'entry' is a [key, value] tupple
      result[entry[0]] = entry[1];
    }
    return result;
  }

  const submitHandler = (e) => {
    if (e !== '') {
      navigate(`/search/${e.trim()}`)
    } else {
      navigate('/')
    }
  }

  // Изменение фильтра в зависимости от странички - если нет search- изменяем по умолчанию на ВСЕ ПИЦЦЫ
  useEffect(() => {
  }, [navigate])
  const params = new URLSearchParams(window.location.href);
  const isThereSearch = JSON.stringify(paramsToObject(params)).indexOf('search');
  const select = document.querySelector('#search_box');
  if (select && isThereSearch === -1) {
    const opt = document.querySelector('#search_box').getElementsByTagName('option');
    opt[0].selected = true;
  }


  return (
    <Form.Select
      // aria-label="Default select example"
      type='text'
      onChange={(e) => submitHandler(e.target.value)}
      className="search-box"
      id="search_box"
    >
      <option value="" >Все пиццы!</option>
      <option >Стандартное меню</option>
      <option >Детское меню</option>
      <option >Пиццы с морепродуктами</option>
      <option >Пиццы мясные</option>
      <option >Пиццы сырные и грибные</option>
    </Form.Select>
  )
}

export default SearchBox
