

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, Spinner, PanelBody, PanelRow, ColorPalette, RangeControl, TextareaControl } from '@wordpress/components';

import OpenAI from 'openai';




const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,

});
//


function Html(props) {
  if (!props.warn) {
    return null;
  }

  const [isLoading, setisLoading] = useState(false);
  const [openAi, setopenAi] = useState({ promt: "", model: '', role: "", reponse: null });


  //var [debounce, setDebounce] = useState(null); // Using the hook.
  //var [keyframesX, setkeyframesX] = useState(props.keyframes); // Using the hook.

  // useEffect(() => {

  //   console.log('useEffect');
  //   console.log(keyframesX);
  //   props.onChange(keyframesX);

  // }, [keyframesX]);



  async function getGTP() {

    console.log(openAi.promt);
    setisLoading(true);

    if (openAi.promt.length > 0) {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": openAi.promt }],
      });
      console.log(chatCompletion.choices[0].message);


      var choices = chatCompletion.choices

      console.log(choices);

      var message = choices[0].message.content
      setopenAi({ ...openAi, reponse: message })



    }



    setTimeout(() => {
      setisLoading(false);
    }, 1000)


  }





  return (

    <div className=' mt-4'>


      <div className='px-3'>




        <TextareaControl
          label=""
          help="Write OpenAI Prompt"
          value={openAi.promt}
          onChange={(value) => {
            setopenAi({ ...openAi, promt: value })

          }}
        />

        <div className='cursor-pointer text-center my-3 bg-blue-500 rounded-sm text-white px-3 py-2' onClick={ev => {
          getGTP();
        }}>


          {isLoading && (
            <span> Please wait...</span>
          )}
          {!isLoading && (
            <span> Get Response</span>
          )}


          {isLoading && (
            <Spinner />
          )}
        </div>


        {openAi.reponse != null && (

          <div className='cursor-pointer whitespace-pre-line p-2 hover:bg-gray-200' title="Click to replace text." onClick={ev => {

            //var options = { ...text.options, content: openAi.reponse };
            //setAttributes({ text: { ...text, options: options } });

          }}>
            {openAi.reponse}
          </div>

        )}




      </div>

    </div>




  )

}


class PGcssOpenaiArticleWriter extends Component {

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

    var {
      args,
      onChange,


    } = this.props;








    return (


      <Html args={args} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGcssOpenaiArticleWriter;