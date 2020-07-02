import React from 'react';
import { Form } from 'semantic-ui-react';
const countries = [
  { "text": "Afghanistan", "flag": "afghanistan", "key": "AF", "value": "AF" },
  { "text": "Åland Islands", "key": "AX", "value": "AX" },
  { "text": "Albania", "flag": "albania", "key": "AL", "value": "AL" },
  { "text": "Algeria", "flag": "algeria", "key": "DZ", "value": "DZ" },
  { "text": "American Samoa", "flag": "american samoa", "key": "AS", "value": "AS" },
  { "text": "AndorrA", "flag": "andorra", "key": "AD", "value": "AD" },
  { "text": "Angola", "flag": "angola", "key": "AO", "value": "AO" },
  { "text": "Anguilla", "flag": "anguilla", "key": "AI", "value": "AI" },
  { "text": "Antarctica", "flag": "antarctica", "key": "AQ", "value": "AQ" },
  { "text": "Antigua and Barbuda", "flag": "antigua and barbuda", "key": "AG", "value": "AG" },
  { "text": "Argentina", "flag": "argentina", "key": "AR", "value": "AR" },
  { "text": "Armenia", "flag": "armenia", "key": "AM", "value": "AM" },
  { "text": "Aruba", "flag": "aruba", "key": "AW", "value": "AW" },
  { "text": "Australia", "flag": "australia", "key": "AU", "value": "AU" },
  { "text": "Austria", "flag": "austria", "key": "AT", "value": "AT" },
  { "text": "Azerbaijan", "flag": "azerbaijan", "key": "AZ", "value": "AZ" },
  { "text": "Bahamas", "flag": "bahamas", "key": "BS", "value": "BS" },
  { "text": "Bahrain", "flag": "bahrain", "key": "BH", "value": "BH" },
  { "text": "Bangladesh", "flag": "bangladesh", "key": "BD", "value": "BD" },
  { "text": "Barbados", "flag": "barbados", "key": "BB", "value": "BB" },
  { "text": "Belarus", "flag": "belarus", "key": "BY", "value": "BY" },
  { "text": "Belgium", "flag": "belgium", "key": "BE", "value": "BE" },
  { "text": "Belize", "flag": "belize", "key": "BZ", "value": "BZ" },
  { "text": "Benin", "flag": "benin", "key": "BJ", "value": "BJ" },
  { "text": "Bermuda", "flag": "bermuda", "key": "BM", "value": "BM" },
  { "text": "Bhutan", "flag": "bhutan", "key": "BT", "value": "BT" },
  { "text": "Bolivia", "flag": "bolivia", "key": "BO", "value": "BO" },
  { "text": "Bosnia and Herzegovina", "flag": "bosnia and herzegovina", "key": "BA", "value": "BA" },
  { "text": "Botswana", "flag": "botswana", "key": "BW", "value": "BW" },
  { "text": "Bouvet Island", "flag": "bouvet island", "key": "BV", "value": "BV" },
  { "text": "Brazil", "flag": "brazil", "key": "BR", "value": "BR" },
  { "text": "British Indian Ocean Territory", "flag": "british indian ocean territory", "key": "IO", "value": "IO" },
  { "text": "Brunei Darussalam", "flag": "brunei darussalam", "key": "BN", "value": "BN" },
  { "text": "Bulgaria", "flag": "bulgaria", "key": "BG", "value": "BG" },
  { "text": "Burkina Faso", "flag": "burkina faso", "key": "BF", "value": "BF" },
  { "text": "Burundi", "flag": "burundi", "key": "BI", "value": "BI" },
  { "text": "Cambodia", "flag": "cambodia", "key": "KH", "value": "KH" },
  { "text": "Cameroon", "flag": "cameroon", "key": "CM", "value": "CM" },
  { "text": "Canada", "flag": "canada", "key": "CA", "value": "CA" },
  { "text": "Cape Verde", "flag": "cape verde", "key": "CV", "value": "CV" },
  { "text": "Cayman Islands", "flag": "cayman islands", "key": "KY", "value": "KY" },
  { "text": "Central African Republic", "flag": "central african republic", "key": "CF", "value": "CF" },
  { "text": "Chad", "flag": "chad", "key": "TD", "value": "TD" },
  { "text": "Chile", "flag": "chile", "key": "CL", "value": "CL" },
  { "text": "China", "flag": "china", "key": "CN", "value": "CN" },
  { "text": "Christmas Island", "flag": "christmas island", "key": "CX", "value": "CX" },
  { "text": "Cocos (Keeling) Islands", "flag": "Cocos (Keeling) Islands", "key": "CC", "value": "CC" },
  { "text": "Colombia", "flag": "colombia", "key": "CO", "value": "CO" },
  { "text": "Comoros", "flag": "comoros", "key": "KM", "value": "KM" },
  { "text": "Congo", "flag": "congo", "key": "CG", "value": "CG" },
  { "text": "Congo, The Democratic Republic of the", "flag": "Congo, The Democratic Republic of the", "key": "CD", "value": "CD" },
  { "text": "Cook Islands", "flag": "cook islands", "key": "CK", "value": "CK" },
  { "text": "Costa Rica", "flag": "costa rica", "key": "CR", "value": "CR" },
  { "text": "Cote D'Ivoire", "flag": "Cote D'Ivoire", "key": "CI", "value": "CI" },
  { "text": "Croatia", "flag": "croatia", "key": "HR", "value": "HR" },
  { "text": "Cuba", "flag": "cuba", "key": "CU", "value": "CU" },
  { "text": "Cyprus", "flag": "cyprus", "key": "CY", "value": "CY" },
  { "text": "Czech Republic", "flag": "czech republic", "key": "CZ", "value": "CZ" },
  { "text": "Denmark", "flag": "denmark", "key": "DK", "value": "DK" },
  { "text": "Djibouti", "flag": "djibouti", "key": "DJ", "value": "DJ" },
  { "text": "Dominica", "flag": "dominica", "key": "DM", "value": "DM" },
  { "text": "Dominican Republic", "flag": "dominican republic", "key": "DO", "value": "DO" },
  { "text": "Ecuador", "flag": "ecuador", "key": "EC", "value": "EC" },
  { "text": "Egypt", "flag": "egypt", "key": "EG", "value": "EG" },
  { "text": "El Salvador", "flag": "el salvador", "key": "SV", "value": "SV" },
  { "text": "Equatorial Guinea", "flag": "equatorial guinea", "key": "GQ", "value": "GQ" },
  { "text": "Eritrea", "flag": "eritrea", "key": "ER", "value": "ER" },
  { "text": "Estonia", "flag": "estonia", "key": "EE", "value": "EE" },
  { "text": "Ethiopia", "flag": "ethiopia", "key": "ET", "value": "ET" },
  { "text": "Falkland Islands (Malvinas)", "key": "FK", "value": "FK" },
  { "text": "Faroe Islands", "flag": "faroe islands", "key": "FO", "value": "FO" },
  { "text": "Fiji", "flag": "fiji", "key": "FJ", "value": "FJ" },
  { "text": "Finland", "flag": "finland", "key": "FI", "value": "FI" },
  { "text": "France", "flag": "france", "key": "FR", "value": "FR" },
  { "text": "French Guiana", "flag": "french guiana", "key": "GF", "value": "GF" },
  { "text": "French Polynesia", "flag": "french polynesia", "key": "PF", "value": "PF" },
  { "text": "French Southern Territories", "flag": "french southern territories", "key": "TF", "value": "TF" },
  { "text": "Gabon", "flag": "gabon", "key": "GA", "value": "GA" },
  { "text": "Gambia", "flag": "gambia", "key": "GM", "value": "GM" },
  { "text": "Georgia", "flag": "georgia", "key": "GE", "value": "GE" },
  { "text": "Germany", "flag": "germany", "key": "DE", "value": "DE" },
  { "text": "Ghana", "flag": "ghana", "key": "GH", "value": "GH" },
  { "text": "Gibraltar", "flag": "gibraltar", "key": "GI", "value": "GI" },
  { "text": "Greece", "flag": "greece", "key": "GR", "value": "GR" },
  { "text": "Greenland", "flag": "greenland", "key": "GL", "value": "GL" },
  { "text": "Grenada", "flag": "grenada", "key": "GD", "value": "GD" },
  { "text": "Guadeloupe", "flag": "guadeloupe", "key": "GP", "value": "GP" },
  { "text": "Guam", "flag": "guam", "key": "GU", "value": "GU" },
  { "text": "Guatemala", "flag": "guatemala", "key": "GT", "value": "GT" },
  { "text": "Guernsey", "flag": "guernsey", "key": "GG", "value": "GG" },
  { "text": "Guinea", "flag": "guinea", "key": "GN", "value": "GN" },
  { "text": "Guinea-Bissau", "key": "GW", "value": "GW" },
  { "text": "Guyana", "flag": "guyana", "key": "GY", "value": "GY" },
  { "text": "Haiti", "flag": "haiti", "key": "HT", "value": "HT" },
  { "text": "Heard Island and Mcdonald Islands", "flag": "heard island and mcdonald islands", "key": "HM", "value": "HM" },
  { "text": "Holy See (Vatican City State)", "key": "VA", "value": "VA" },
  { "text": "Honduras", "flag": "honduras", "key": "HN", "value": "HN" },
  { "text": "Hong Kong", "flag": "hong kong", "key": "HK", "value": "HK" },
  { "text": "Hungary", "flag": "hungary", "key": "HU", "value": "HU" },
  { "text": "Iceland", "flag": "iceland", "key": "IS", "value": "IS" },
  { "text": "India", "flag": "india", "key": "IN", "value": "IN" },
  { "text": "Indonesia", "flag": "indonesia", "key": "ID", "value": "ID" },
  { "text": "Iran, Islamic Republic Of", "key": "IR", "value": "IR" },
  { "text": "Iraq", "flag": "iraq", "key": "IQ", "value": "IQ" },
  { "text": "Ireland", "flag": "ireland", "key": "IE", "value": "IE" },
  { "text": "Isle of Man", "flag": "isle of man", "key": "IM", "value": "IM" },
  { "text": "Israel", "flag": "israel", "key": "IL", "value": "IL" },
  { "text": "Italy", "flag": "italy", "key": "IT", "value": "IT" },
  { "text": "Jamaica", "flag": "jamaica", "key": "JM", "value": "JM" },
  { "text": "Japan", "flag": "japan", "key": "JP", "value": "JP" },
  { "text": "Jersey", "flag": "jersey", "key": "JE", "value": "JE" },
  { "text": "Jordan", "flag": "jordan", "key": "JO", "value": "JO" },
  { "text": "Kazakhstan", "flag": "kazakhstan", "key": "KZ", "value": "KZ" },
  { "text": "Kenya", "flag": "kenya", "key": "KE", "value": "KE" },
  { "text": "Kiribati", "flag": "kiribati", "key": "KI", "value": "KI" },
  { "text": "Korea, Democratic People'S Republic of", "key": "KP", "value": "KP" },
  { "text": "Korea, Republic of", "key": "KR", "value": "KR" },
  { "text": "Kuwait", "flag": "kuwait", "key": "KW", "value": "KW" },
  { "text": "Kyrgyzstan", "flag": "kyrgyzstan", "key": "KG", "value": "KG" },
  { "text": "Lao People'S Democratic Republic", "key": "LA", "value": "LA" },
  { "text": "Latvia", "flag": "latvia", "key": "LV", "value": "LV" },
  { "text": "Lebanon", "flag": "lebanon", "key": "LB", "value": "LB" },
  { "text": "Lesotho", "flag": "lesotho", "key": "LS", "value": "LS" },
  { "text": "Liberia", "flag": "liberia", "key": "LR", "value": "LR" },
  { "text": "Libyan Arab Jamahiriya", "flag": "libyan arab jamahiriya", "key": "LY", "value": "LY" },
  { "text": "Liechtenstein", "flag": "liechtenstein", "key": "LI", "value": "LI" },
  { "text": "Lithuania", "flag": "lithuania", "key": "LT", "value": "LT" },
  { "text": "Luxembourg", "flag": "luxembourg", "key": "LU", "value": "LU" },
  { "text": "Macao", "flag": "macao", "key": "MO", "value": "MO" },
  { "text": "Macedonia, The Former Yugoslav Republic of", "key": "MK", "value": "MK" },
  { "text": "Madagascar", "flag": "madagascar", "key": "MG", "value": "MG" },
  { "text": "Malawi", "flag": "malawi", "key": "MW", "value": "MW" },
  { "text": "Malaysia", "flag": "malaysia", "key": "MY", "value": "MY" },
  { "text": "Maldives", "flag": "maldives", "key": "MV", "value": "MV" },
  { "text": "Mali", "flag": "mali", "key": "ML", "value": "ML" },
  { "text": "Malta", "flag": "malta", "key": "MT", "value": "MT" },
  { "text": "Marshall Islands", "flag": "marshall islands", "key": "MH", "value": "MH" },
  { "text": "Martinique", "flag": "martinique", "key": "MQ", "value": "MQ" },
  { "text": "Mauritania", "flag": "mauritania", "key": "MR", "value": "MR" },
  { "text": "Mauritius", "flag": "mauritius", "key": "MU", "value": "MU" },
  { "text": "Mayotte", "flag": "mayotte", "key": "YT", "value": "YT" },
  { "text": "Mexico", "flag": "mexico", "key": "MX", "value": "MX" },
  { "text": "Micronesia, Federated States of", "key": "FM", "value": "FM" },
  { "text": "Moldova, Republic of", "key": "MD", "value": "MD" },
  { "text": "Monaco", "flag": "monaco", "key": "MC", "value": "MC" },
  { "text": "Mongolia", "flag": "mongolia", "key": "MN", "value": "MN" },
  { "text": "Montserrat", "flag": "montserrat", "key": "MS", "value": "MS" },
  { "text": "Morocco", "flag": "morocco", "key": "MA", "value": "MA" },
  { "text": "Mozambique", "flag": "mozambique", "key": "MZ", "value": "MZ" },
  { "text": "Myanmar", "flag": "myanmar", "key": "MM", "value": "MM" },
  { "text": "Namibia", "flag": "namibia", "key": "NA", "value": "NA" },
  { "text": "Nauru", "flag": "nauru", "key": "NR", "value": "NR" },
  { "text": "Nepal", "flag": "nepal", "key": "NP", "value": "NP" },
  { "text": "Netherlands", "flag": "netherlands", "key": "NL", "value": "NL" },
  { "text": "Netherlands Antilles", "flag": "netherlands antilles", "key": "AN", "value": "AN" },
  { "text": "New Caledonia", "flag": "new caledonia", "key": "NC", "value": "NC" },
  { "text": "New Zealand", "flag": "new zealand", "key": "NZ", "value": "NZ" },
  { "text": "Nicaragua", "flag": "nicaragua", "key": "NI", "value": "NI" },
  { "text": "Niger", "flag": "niger", "key": "NE", "value": "NE" },
  { "text": "Nigeria", "flag": "nigeria", "key": "NG", "value": "NG" },
  { "text": "Niue", "flag": "niue", "key": "NU", "value": "NU" },
  { "text": "Norfolk Island", "flag": "norfolk island", "key": "NF", "value": "NF" },
  { "text": "Northern Mariana Islands", "flag": "northern mariana islands", "key": "MP", "value": "MP" },
  { "text": "Norway", "flag": "norway", "key": "NO", "value": "NO" },
  { "text": "Oman", "flag": "oman", "key": "OM", "value": "OM" },
  { "text": "Pakistan", "flag": "pakistan", "key": "PK", "value": "PK" },
  { "text": "Palau", "flag": "palau", "key": "PW", "value": "PW" },
  { "text": "Palestinian Territory, Occupied", "key": "PS", "value": "PS" },
  { "text": "Panama", "flag": "panama", "key": "PA", "value": "PA" },
  { "text": "Papua New Guinea", "flag": "papua new guinea", "key": "PG", "value": "PG" },
  { "text": "Paraguay", "flag": "paraguay", "key": "PY", "value": "PY" },
  { "text": "Peru", "flag": "peru", "key": "PE", "value": "PE" },
  { "text": "Philippines", "flag": "philippines", "key": "PH", "value": "PH" },
  { "text": "Pitcairn", "flag": "pitcairn", "key": "PN", "value": "PN" },
  { "text": "Poland", "flag": "poland", "key": "PL", "value": "PL" },
  { "text": "Portugal", "flag": "portugal", "key": "PT", "value": "PT" },
  { "text": "Puerto Rico", "flag": "puerto rico", "key": "PR", "value": "PR" },
  { "text": "Qatar", "flag": "qatar", "key": "QA", "value": "QA" },
  { "text": "Reunion", "flag": "reunion", "key": "RE", "value": "RE" },
  { "text": "Romania", "flag": "romania", "key": "RO", "value": "RO" },
  { "text": "Russian Federation", "flag": "russian federation", "key": "RU", "value": "RU" },
  { "text": "RWANDA", "flag": "rwanda", "key": "RW", "value": "RW" },
  { "text": "Saint Helena", "flag": "saint helena", "key": "SH", "value": "SH" },
  { "text": "Saint Kitts and Nevis", "flag": "saint kitts and nevis", "key": "KN", "value": "KN" },
  { "text": "Saint Lucia", "flag": "saint lucia", "key": "LC", "value": "LC" },
  { "text": "Saint Pierre and Miquelon", "flag": "saint pierre and miquelon", "key": "PM", "value": "PM" },
  { "text": "Saint Vincent and the Grenadines", "flag": "saint vincent and the grenadines", "key": "VC", "value": "VC" },
  { "text": "Samoa", "flag": "samoa", "key": "WS", "value": "WS" },
  { "text": "San Marino", "flag": "san marino", "key": "SM", "value": "SM" },
  { "text": "Sao Tome and Principe", "flag": "sao tome and principe", "key": "ST", "value": "ST" },
  { "text": "Saudi Arabia", "flag": "saudi arabia", "key": "SA", "value": "SA" },
  { "text": "Senegal", "flag": "senegal", "key": "SN", "value": "SN" },
  { "text": "Serbia and Montenegro", "flag": "serbia and montenegro", "key": "CS", "value": "CS" },
  { "text": "Seychelles", "flag": "seychelles", "key": "SC", "value": "SC" },
  { "text": "Sierra Leone", "flag": "sierra leone", "key": "SL", "value": "SL" },
  { "text": "Singapore", "flag": "singapore", "key": "SG", "value": "SG" },
  { "text": "Slovakia", "flag": "slovakia", "key": "SK", "value": "SK" },
  { "text": "Slovenia", "flag": "slovenia", "key": "SI", "value": "SI" },
  { "text": "Solomon Islands", "flag": "solomon islands", "key": "SB", "value": "SB" },
  { "text": "Somalia", "flag": "somalia", "key": "SO", "value": "SO" },
  { "text": "South Africa", "flag": "south africa", "key": "ZA", "value": "ZA" },
  { "text": "South Georgia and the South Sandwich Islands", "flag": "south georgia and the south sandwich islands", "key": "GS", "value": "GS" },
  { "text": "Spain", "flag": "spain", "key": "ES", "value": "ES" },
  { "text": "Sri Lanka", "flag": "sri lanka", "key": "LK", "value": "LK" },
  { "text": "Sudan", "flag": "sudan", "key": "SD", "value": "SD" },
  { "text": "Suritext", "flag": "suri", "key": "SR", "value": "SR" },
  { "text": "Svalbard and Jan Mayen", "flag": "svalbard and jan mayen", "key": "SJ", "value": "SJ" },
  { "text": "Swaziland", "flag": "swaziland", "key": "SZ", "value": "SZ" },
  { "text": "Sweden", "flag": "sweden", "key": "SE", "value": "SE" },
  { "text": "Switzerland", "flag": "switzerland", "key": "CH", "value": "CH" },
  { "text": "Syrian Arab Republic", "flag": "syrian arab republic", "key": "SY", "value": "SY" },
  { "text": "Taiwan, Province of China", "flag": "taiwan", "key": "TW", "value": "TW" },
  { "text": "Tajikistan", "flag": "tajikistan", "key": "TJ", "value": "TJ" },
  { "text": "Tanzania, United Republic of", "flag": "tanzania", "key": "TZ", "value": "TZ" },
  { "text": "Thailand", "flag": "thailand", "key": "TH", "value": "TH" },
  { "text": "Timor-Leste", "flag": "timorleste", "key": "TL", "value": "TL" },
  { "text": "Togo", "flag": "togo", "key": "TG", "value": "TG" },
  { "text": "Tokelau", "flag": "tokelau", "key": "TK", "value": "TK" },
  { "text": "Tonga", "flag": "tonga", "key": "TO", "value": "TO" },
  { "text": "Trinidad and Tobago", "flag": "trinidad and tobago", "key": "TT", "value": "TT" },
  { "text": "Tunisia", "flag": "tunisia", "key": "TN", "value": "TN" },
  { "text": "Turkey", "flag": "turkey", "key": "TR", "value": "TR" },
  { "text": "Turkmenistan", "flag": "turkmenistan", "key": "TM", "value": "TM" },
  { "text": "Turks and Caicos Islands", "flag": "turks and caicos islands", "key": "TC", "value": "TC" },
  { "text": "Tuvalu", "flag": "tuvalu", "key": "TV", "value": "TV" },
  { "text": "Uganda", "flag": "uganda", "key": "UG", "value": "UG" },
  { "text": "Ukraine", "flag": "ukraine", "key": "UA", "value": "UA" },
  { "text": "United Arab Emirates", "flag": "united arab emirates", "key": "AE", "value": "AE" },
  { "text": "United Kingdom", "flag": "united kingdom", "key": "GB", "value": "GB" },
  { "text": "United States", "flag": "united states", "key": "US", "value": "US" },
  { "text": "United States Minor Outlying Islands", "flag": "united states minor outlying islands", "key": "UM", "value": "UM" },
  { "text": "Uruguay", "flag": "uruguay", "key": "UY", "value": "UY" },
  { "text": "Uzbekistan", "flag": "uzbekistan", "key": "UZ", "value": "UZ" },
  { "text": "Vanuatu", "flag": "vanuatu", "key": "VU", "value": "VU" },
  { "text": "Venezuela", "flag": "venezuela", "key": "VE", "value": "VE" },
  { "text": "Viet Nam", "flag": "vietnam", "key": "VN", "value": "VN" },
  { "text": "Virgin Islands, British", "flag": "virgin islands british", "key": "VG", "value": "VG" },
  { "text": "Virgin Islands, U.S.", "flag": "virgin islands us", "key": "VI", "value": "VI" },
  { "text": "Wallis and Futuna", "flag": "wallis and futuna", "key": "WF", "value": "WF" },
  { "text": "Western Sahara", "flag": "western sahara", "key": "EH", "value": "EH" },
  { "text": "Yemen", "flag": "yemen", "key": "YE", "value": "YE" },
  { "text": "Zambia", "flag": "zambia", "key": "ZM", "value": "ZM" },
  { "text": "Zimbabwe", "flag": "zimbabwe", "key": "ZW", "value": "ZW" }
];

const CountrySelect = (props) => {

  return (
    <Form.Select search fluid placeholder='Select your country' label='Country' options={countries} {...props} />
  );
}

export default CountrySelect;
