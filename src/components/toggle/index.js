

const { Component, RawHTML, useState } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';


class PGtoggle extends Component {
  render() {


    const {
      title,
      initialOpen,
      befroeTitle,

      children



    } = this.props;


    function MyFunction() {


      const [isOpen, setIsOpen] = useState(initialOpen);

      var icon = '';


      // useEffect(() => {
      // }, [keyword]);




      return (

        <div className='toggleWrapper'>

          <div className='toggleHeader border-b border-solid hover:bg-gray-200 px-2 py-3 flex justify-between' >

            <div className='flex'>{befroeTitle}

              <span className='cursor-pointer px-2' onClick={ev => {


                setIsOpen(!isOpen);

              }}>{title}</span>

            </div>


            <div>{isOpen ? <Icon icon={chevronDown} />
              : <Icon icon={chevronUp} />
            }</div>

          </div>

          {isOpen && (
            <div className='toggleContent py-3'>

              {children}

            </div>

          )}



        </div>

      )
    }


    var args = [
      { "label": "Select..", "value": "" },
      { "label": "None", "value": "none" },
      { "label": "Inline", "value": "inline" },
      { "label": "Inline Block", "value": "inline-block" },

    ];


    return (
      <div>
        <MyFunction />


      </div>

    )
  }
}


export default PGtoggle;