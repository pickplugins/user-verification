

const { Component } = wp.element;





class PGinputSelect extends Component {


  render() {

    var {
      val,
      options,
      multiple,
      inputClass,
      wrapperClass,
      onChange,


    } = this.props;

    val = (val == undefined) ? "" : val;


    function Html() {



      return (

        <>

          {multiple == true && (<>
            <select className={`w-full ${inputClass} `}
              multiple
              onChange={(event) => {

                var options = event.target.options;

                var selected = [];

                for (var i = 0, l = options.length; i < l; i++) {
                  if (options[i].selected) {
                    selected.push(options[i].value);

                  }
                }

                onChange(selected);
              }}
            >
              {options.map(x => {

                var isSelected = val.includes(x.value)

                return (
                  <option value={x.value}

                    selected={isSelected}

                  >{x.label}</option>
                )
              })}
            </select>
          </>)}


          {multiple == false && (<>
            <select
              className={`w-full ${inputClass} `}
              onChange={(event) => {
                var currentVal = options[event.target.options.selectedIndex].value;
                onChange(currentVal);
              }}
            >
              {options.map((x, index) => {
                var selected = val.includes(x.value)

                return (
                  <option key={index} value={x.value} selected={selected}
                  >{x.label}</option>
                )
              })}
            </select>
          </>)}




        </>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGinputSelect;