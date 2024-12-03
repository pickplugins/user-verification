

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl, PanelRow } from '@wordpress/components'
import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    static: { "label": "static", "value": "static" },
    absolute: { "label": "absolute", "value": "absolute" },
    fixed: { "label": "fixed", "value": "fixed" },
    relative: { "label": "relative", "value": "relative" },
    sticky: { "label": "sticky", "value": "sticky" },
  };

  var valX = (props.val == undefined || props.val == null || props.val.length == 0) ? 'relative' : props.val;

  console.log('props.val', props.val);


  const [valArgs, setValArgs] = useState(valX.split(" "));

  const [value, setValue] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);

  console.log('value', value);
  console.log('isImportant', isImportant);

  console.log('args[value]', args[value]);




  return (
    <div className='flex justify-between items-center'>


      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title="Clear"

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <div className=" ">{(args[value] == undefined) ? 'Select...' : args[value].label}</div>


          </Button>
        )}
        renderContent={() => <div className='w-32 pg-font'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                setValue(x.value)

                if (isImportant) {
                  props.onChange(x.value + ' !important', 'position');

                } else {
                  props.onChange(x.value, 'position');

                }



              }}>

                {x.value && (

                  <>{x.label}</>

                )}

              </div>

            )

          })}
        </div>}
      />

      <ToggleControl
        label={
          isImportant
            ? 'Important Enabled'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {

          //console.log(arg);
          setImportant(isImportant => !isImportant)

          if (isImportant) {
            props.onChange(value, 'position');

          } else {
            props.onChange(value + ' !important', 'position');

          }


        }}
      />

    </div>
  )


}


class PGcssPosition extends Component {

  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }


  render() {


    const {
      val,
      onChange,



    } = this.props;







    return (

      <Html val={val} onChange={onChange} warn={this.state.showWarning} />

    )
  }
}


export default PGcssPosition;