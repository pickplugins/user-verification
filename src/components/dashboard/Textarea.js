import React from "react";

const Textarea = ({ title, val, update, subtitle }) => {
	return (
		<div className="flex flex-col">
			<label htmlFor="" className="font-medium text-base mb-2">
				{title}
			</label>

			<textarea className="flex-1 text-[12px] " value={val} onChange={update} />
			<p className="text-gray-500 font-light !text-[11px] !mt-1">{subtitle}</p>
		</div>
	);
};

export default Textarea;
