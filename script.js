import KEY from './api.js';

const val = $('#input');
const result_name = $('#result_name');
const today_temp = $('#result_temp');
const todayBriefResult = $('#brief');
const btn = $('#submit');
const todayWeatherImg = $('.weather_icon');
const main_wrapper = $('.day_wrapper');
const mykey = 'MY_KEY_PLACEHOLDER';

function getVal() {
    if (val.val() != '') {
        $('.span').removeClass("d-none");
    }

    if (val.val() === '') {
        result_name.text("Insert a valid city or country.");
    } else {
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${val.val()}&units=metric&appid=${KEY}`;
        $.get(url, function (data) {
            let temperature = data.list[0].main['temp'];
            result_name.text(data.city.name + ', ' + data.city.country);
            today_temp.text(temperature + "°C");
            const iconSrc = data.list[0].weather[0]['icon'];
            todayWeatherImg.attr("src", `http://openweathermap.org/img/w/${iconSrc}.png`);
            todayWeatherImg.attr("alt", "Weather Icon");
            todayWeatherImg.removeClass("d-none");

            const dates = $('.date');
            const details = $('.details');
            const images = $('.forecast_weather_icon');

            var dateNum = 8;
            dates.each(function (index, single_date) {
                if (dateNum <= 38) {
                    $(single_date).text(data.list[dateNum]['dt_txt'].slice(0, 10));
                    dateNum += 8;
                }
            });

            var detailsNum = 8;
            details.each(function (index, detail) {
                if (detailsNum <= 38) {
                    $(detail).text(data.list[detailsNum].main['temp'] + '°C. ' + data.list[detailsNum].weather[0]['description'] + '.');
                    detailsNum += 8;
                }
            });

            var imagesNum = 8;
            images.each(function (index, image) {
                if (imagesNum <= 38) {
                    $(image).attr("src", `http://openweathermap.org/img/w/${data.list[imagesNum].weather[0]['icon']}.png`);
                    $(image).attr("alt", "Weather Icon");
                    $(image).removeClass("d-none");
                    imagesNum += 8;
                }
            });

            todayBriefResult.text('Feels like ' + data.list[0].main['feels_like'] + '°C, ' + data.list[0].weather[0]['description'] + '.');
            main_wrapper.addClass("main_day_wrapper");
        });
    }
}

btn.click(getVal);