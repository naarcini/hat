function setCanvasSize(canvas_jq, width, height) {
    canvas_jq.css('width', width);
    canvas_jq.css('height', height);
    canvas_jq.attr('width', width);
    canvas_jq.attr('height', height);
    var canvas = canvas_jq.get(0);
    var context = canvas.getContext("2d");
    // make the h/w accessible from context obj as well
    context.width = width;
    context.height = height;

    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;

    // upscale the canvas if the two ratios don't match
    if(devicePixelRatio !== backingStoreRatio) {
        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        context.scale(ratio, ratio);
    }

    pixelRatio = ratio;

}
    
function Canvas(jq_elem) {
    // create a canvas inside another element
    // and set the height&width to fill the element
    var canvas_jq = $('<canvas>');
    var width = jq_elem.innerWidth();
    var height = jq_elem.innerHeight();
    
    setCanvasSize(canvas_jq, width, height);

    canvas_jq.appendTo(jq_elem);
    return canvas_jq;
}

function Hat(owner, xpos, ypos) {
    this.owner = owner;
    this.xpos = xpos;
    this.ypos = ypos;
    this.message = null;

    this.get_image = function( tile_num ) {
        return $('#Hat_pic');
    }

    this.get_position = function() {
        return [this.xpos, this.ypos];
    }

    this.set_position = function(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }

    this.get_owner = function() {
        return this.owner;
    }

    this.set_owner = function(owner) {
        if( !owner ) {
            this.owner = null;
        }
        else {
            this.owner = owner;
        }
    }

    this.get_message = function() {
        return this.message;
    }
}

function dude(player_id, xpos, ypos, dx, dy, move_speed, has_hat, guy) {
    // Instance variables
    this.player_id = player_id;
    this.xpos = xpos;
    this.ypos = ypos;
    this.dx = dx;
    this.dy = dy;
    this.move_speed = move_speed;
    this.has_hat = has_hat;
    this.guy = guy;
    this.message = null;

    // Methods
    this.get_image = function( tile_num ) {
        var img = null;
        var selector = null;
        var hat_text = this.has_hat ? 'HAT_' : '';
        var guy_text = this.guy.toString();
        var tile_text = tile_num.toString();
        if( tile_num < 10 ) {
            tile_text = '0'+ tile_text;
        }

        if( this.dx > 0 ) {
            selector = 'GUY'+guy_text+'_WALK_RIGHT_'+hat_text+tile_text;
        }
        else if( this.dx < 0) {
            selector = 'GUY'+guy_text+'_WALK_LEFT_'+hat_text+tile_text
        }
        else if( this.dy > 0 ) {
            selector = 'GUY'+guy_text+'_WALK_FRONT_'+hat_text+tile_text;
        }
        else if( this.dy < 0 ) {
            selector = 'GUY'+guy_text+'_WALK_BACK_'+hat_text+tile_text;
        }
        else {
            selector = 'GUY'+guy_text+'_IDLE_'+hat_text+tile_text;
        }

        img = $('#'+selector);
        return img;
    }

    this.get_player = function() {
        return player_id;
    }

    this.get_position = function() {
        return [this.xpos, this.ypos];
    }

    this.set_position = function(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }

    this.get_movement = function() {
        return[this.dx, this.dy];
    }

    this.set_movement = function(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    this.get_hat_status = function() {
        return this.has_hat;
    }

    this.set_hat_status = function(has_hat) {
        this.has_hat = has_hat;
    }

    this.set_guy = function(guy) {
        this.guy = guy;
    }

    this.get_guy = function() {
        return this.guy;
    }

    this.get_message = function() {
        return this.message;
    }

    this.set_message = function(message) {
        this.message = message;
    }

/*
    talk = function( ctx, width, height, text ) {
        var x = xpos + dude_size + 5;
        var y = ypos - 5;

        var curvy_width = 20;
        var curvy_height = 20;
        var curviness = 10;

        // Draw curvy part
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x+curvy_width/2+curviness, y-curvy_height/2, x, y-curvy_height);
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x+curvy_width/2+curviness, y-curvy_height/2, x+curvy_height, y-curvy_height);
        
        //Draw Rectangular part
        var rect_x = x + curvy_width/2 - width/2;
        var rect_y = y - curvy_height - height;

        ctx.moveTo(rect_x, rect_y+radius);
        ctx.lineTo(rect_x, rect_y+height-radius);
        ctx.quadraticCurveTo(rect_x, rect_y+height, rect_x+radius, rect_y+height);
        ctx.lineTo(rect_x+width/2-curvy_width/2, rect_y+height);
        ctx.moveTo(rect_x+width/2+curvy_width/2, rect_y+height);
        ctx.lineTo(rect_x+width-radius, rect_y+height);
        ctx.quadraticCurveTo(rect_x+width, rect_y+height, rect_x+width, rect_y+height-radius);
        ctx.lineTo(rect_x+width, rect_y+radius);
        ctx.quadraticCurveTo(rect_x+width, rect_y, rect_x+width-radius, rect_y);
        ctx.lineTo(rect_x+radius, rect_y);
        ctx.quadraticCurveTo(rect_x, rect_y, rect_x, rect_y+radius);
        ctx.stroke();
    }
    */
    

}


function gameCanvas(jq_elem, xpos, ypos, move_speed, max_x, max_y) {
    this.jq_elem = jq_elem;
    this.state = 'stopped';
    this.anim_frame = null;
    this.xpos = xpos;
    this.ypos = ypos;
    this.max_x = max_x;
    this.max_y = max_y;
    this.dx = 0;
    this.dy = 0;
    this.move_speed = move_speed;
    this.other_dudes = {};
    this.messageTimeout = 500;
    this.messageCounter = 0;

    var that = this;
    this.network = null
    this.hat = new Hat(null, this.max_x, this.max_y);

    // Methods
    this.init = function() {
        this.game_canvas = new Canvas(jq_elem);
        this.context = this.game_canvas.get(0).getContext('2d');

        this.background = $('#game_background');
        this.background_height = this.background.height();
        this.background_width = this.background.width();
        this.background_img = this.background.get(0);

        this.xpos_img = this.background_width/2;
        this.ypos_img = this.background_height/2;

        // dude(player_id, xpos, ypos, dx, dy, move_speed, has_hat, guy)
        this.your_dude = new dude("you", this.xpos, this.ypos, this.dx, this.dy, this.move_speed, 0, 1);
        //this.other_dudes["not_you"] = new dude("not_you", this.test_dude_x, 0, 10, 0, this.move_speed, 1);
        //this.hat = new Hat(null, 700, 700);

        // A tile refers to the picture of a guy at a given position (ie idle, right foot forward)
        // Switching tiles causes animation
        this.tile_num = 1;
        this.total_tiles = 2;
        this.frame_counter = 1;
        this.tile_interval = 10;

    }

    this.connect = function(network) {
        this.network = network;
    }

    this.resetGameCanvas = function() {
        this.context.clearRect(0, 0, this.context.width, this.context.height);
    }

    this.move = function() {
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.update_locations();

        // Draw background - Wrap around if too big
        this.draw_background();

        // Update player
        this.your_dude = this.update_dude(this.your_dude, this.xpos, this.ypos, this.dx, this.dy, this.your_dude.get_hat_status(), this.your_dude.get_guy());

        // Update and draw other dudes
        $.each(this.other_dudes, function(session_id, dude) {
            //var dude = that.update_dude(dude, dude.posx, dude.posy, dude.dx, 0, 1);
            that.draw_object(dude);
        });

        // Update and draw hat
        this.update_hat();

        // Send information
        var json_message = JSON.stringify({'action': 'move', 'body': {'session': window.session_id, 'x': this.xpos, 'y': this.ypos, 'dx': this.dx, 'dy': this.dy, 'hat_owner': this.your_dude.get_hat_status(), 'speech': this.your_dude.get_message()}});
        if(this.network !== null) {
            //console.log(json_message);
            this.network.send(json_message);
        }

        if( this.your_dude.get_message() != null && this.messageCounter < this.messageTimeout) {
            this.messageCounter++;
        }
        else if( this.messageCounter >= this.messageTimeout ) {
            this.messageCounter = 0;
            this.your_dude.set_message(null);
        }

        // Draw player
        this.draw_object(this.your_dude);

    }

    this.set_hat_owner = function(owner) {
        this.hat.set_owner(owner);
    }

    this.update_hat = function() {
        var image_jq, img, img_height, img_width, x_off, x_off_other, y_off, y_off_other, hat_x, hat_y;

        if( !this.hat.get_owner() ) {
            hat_x = this.hat.get_position()[0];
            hat_y = this.hat.get_position()[1];

            image_jq = this.hat.get_image(this.tile_num);
            img = image_jq.get(0);
            img_height = image_jq.height()/2;
            img_width = image_jq.width()/2;

            x_off = (hat_x - this.xpos);
            x_off_other = x_off < 0 ? (2*this.max_x - Math.abs(x_off)) : (2*this.max_x - x_off)*(-1);
            x_off_other = (x_off == 0) ? 0 : x_off_other;
            y_off = (hat_y - this.ypos);
            y_off_other = y_off < 0 ? (2*this.max_y - Math.abs(y_off)) : (2*this.max_y - y_off)*(-1);
            y_off_other = (y_off == 0) ? 0 : y_off_other;

            if( (Math.abs(x_off) < 50 || Math.abs(x_off_other) < 50) && (Math.abs(y_off) < 50 || Math.abs(y_off_other) < 50) ) {
                this.hat.set_owner(window.session_id);
                this.your_dude.set_hat_status(1);
            }
        }
        else if ( this.hat.get_owner() != window.session_id ){
            this.your_dude.set_hat_status(0);
        }
        else {
            this.hat.set_position(this.your_dude.get_position()[0], this.your_dude.get_position()[1]);
        }

        if( !this.hat.get_owner() ) {
            this.draw_object(this.hat);
        }
        
    }

    this.update_dude = function(dude, xpos, ypos, dx, dy, has_hat, guy) {
        dude.set_position(xpos, ypos);
        dude.set_movement(dx, dy);
        dude.set_hat_status(has_hat);
        dude.set_guy(guy);

        return dude;
    }

    this.add_message = function(message) {
        this.messageCounter = 0;
        this.your_dude.set_message(message);
    };

    this.draw_object = function(object) {
        var image_jq, img, img_height, img_width, obj_x, obj_y, x_off, x_off_other, y_off, y_off_other, message;
        var draw_locations = new Array();
        obj_x = object.get_position()[0];
        obj_y = object.get_position()[1];
        message = object.get_message();

        if( false ) {
            console.log([object.get_position()[0], object.get_position()[1], this.xpos, this.ypos]);
        }

        image_jq = object.get_image(this.tile_num);
        img = image_jq.get(0);
        img_height = image_jq.height()/2;
        img_width = image_jq.width()/2;

        x_off = (obj_x - this.xpos);
        x_off_other = x_off < 0 ? (2*this.max_x - Math.abs(x_off)) : (2*this.max_x - x_off)*(-1);
        x_off_other = (x_off == 0) ? 0 : x_off_other;
        y_off = (obj_y - this.ypos);
        y_off_other = y_off < 0 ? (2*this.max_y - Math.abs(y_off)) : (2*this.max_y - y_off)*(-1);
        y_off_other = (y_off == 0) ? 0 : y_off_other;

        var draw_x, draw_y;
        if( x_off == 0 && y_off == 0 ) {
            draw_x = this.context.width/2 - img_width/2;
            draw_y = this.context.height/2 - img_height/2;
            draw_locations.push([draw_x, draw_y])
        }
        else {
            if( Math.abs(x_off) < this.context.width/2 ) {
                draw_x = this.context.width/2 - img_width/2 + x_off;

                if( Math.abs(y_off) < this.context.height/2 ) {
                    draw_y = this.context.height/2 - img_height/2 - y_off;
                    draw_locations.push([draw_x, draw_y]);
                }

                if( Math.abs(y_off_other) < this.context.height/2 ) {
                    draw_y = this.context.height/2 - img_height/2 - y_off_other;
                    draw_locations.push([draw_x, draw_y]);
                }
            }
            if( Math.abs(x_off_other) < this.context.width/2 ) {
                draw_x = this.context.width/2 - img_width/2 + x_off_other;

                if( Math.abs(y_off) < this.context.height/2 ) {
                    draw_y = this.context.height/2 - img_height/2 - y_off;
                    draw_locations.push([draw_x, draw_y]);
                }

                if( Math.abs(y_off_other) < this.context.height/2 ) {
                    draw_y = this.context.height/2 - img_height/2 - y_off_other;
                    draw_locations.push([draw_x, draw_y]);
                }
            }
        }

        for( var i=0; i<draw_locations.length; i++ ) {
            this.context.drawImage(img, draw_locations[i][0], draw_locations[i][1], img_width, img_height);
            if( message != null && message != '' ) {
                // Speech bubble
                var x = draw_locations[i][0] + img_width;
                var y = draw_locations[i][1] + 20;

                var curvy_width = 20;
                var curvy_height = 20;
                var curviness = 10;
                var width = 150;
                var height = 90;
                var radius = 10;

                var rect_x = x + curvy_width/2 - width/2;
                var rect_y = y - curvy_height - height;

                // Draw curvy part
                this.context.beginPath();
                this.context.moveTo(x, y-curvy_height);
                this.context.quadraticCurveTo(x+curvy_width/2+curviness, y-curvy_height/2, x, y);
                this.context.quadraticCurveTo(x+curvy_width/2+curviness, y-curvy_height/2, x+curvy_height, y-curvy_height);

                // Draw Rectangular part
                this.context.lineTo(rect_x+width-radius, rect_y+height);
                this.context.quadraticCurveTo(rect_x+width, rect_y+height, rect_x+width, rect_y+height-radius);
                this.context.lineTo(rect_x+width, rect_y+radius);
                this.context.quadraticCurveTo(rect_x+width, rect_y, rect_x+width-radius, rect_y);
                this.context.lineTo(rect_x+radius, rect_y);
                this.context.quadraticCurveTo(rect_x, rect_y, rect_x, rect_y+radius);
                this.context.lineTo(rect_x, rect_y+height-radius);
                this.context.quadraticCurveTo(rect_x, rect_y+height, rect_x+radius, rect_y+height);
                this.context.lineTo(rect_x+width/2-curvy_width/2, rect_y+height);
                
                this.context.closePath();
                this.context.fillStyle = "#FFF";
                this.context.fill();
                this.context.stroke();

                this.context.fillStyle = "#000";
                this.context.font = "normal 10pt Calibri";

                var letters = message.split('');
                var fragment = letters[0];
                var line = 0;
                for(var i=1; i<letters.length; i++) {
                    fragment = fragment+letters[i];
                    if( i % 20 == 0 ) {
                        this.context.fillText(fragment, rect_x+10, rect_y+15+line*12);
                        fragment = "";
                        line++;
                    }
                }
                this.context.fillText(fragment, rect_x+10, rect_y+15+line*12);
            }
        }
    }

    this.move_start = function( keyCode ) {
        if( keyCode == 37 ) {
            // Left
            this.dx = -this.move_speed;
        }
        else if( keyCode == 38 ) {
            // Up
            this.dy = -this.move_speed;
        }
        else if( keyCode == 39 ) {
            // Right
            this.dx = this.move_speed;
        }
        else if( keyCode == 40 ) {
            // Down
            this.dy = this.move_speed;
        }

        if( this.dx != 0 && this.dy != 0 ) {
            this.dx = this.dx > 0 ? this.move_speed / 2 : -this.move_speed / 2;
            this.dy = this.dy > 0 ? this.move_speed / 2 : -this.move_speed / 2;
        }
    }

    this.move_stop = function( keyCode ) {
        if( keyCode == 37 && this.dx < 0 ) {
            // Left
            this.dx = 0;
        }
        else if( keyCode == 38 && this.dy < 0 ) {
            // Up
            this.dy = 0;
        }
        else if( keyCode == 39 && this.dx > 0 ) {
            // Right
            this.dx = 0;
        }
        else if( keyCode == 40 && this.dy > 0 ) {
            // Down
            this.dy = 0;
        }

        if( this.dx != 0 && this.dy == 0 ) {
            this.dx = this.dx > 0 ? this.move_speed : -this.move_speed ;
        }
        if( this.dy != 0 && this.dx == 0 ) {
            this.dy = this.dy > 0 ? this.move_speed : -this.move_speed ;
        }
    }

    this.change_speed = function( speed ) {
        move_speed = speed;
    }

    this.update_locations = function() {
        // Actual x and y positions
        this.xpos = this.xpos + this.dx;
        if( Math.abs(this.xpos) >= this.max_x ) {
            this.xpos = this.xpos < 0 ? (this.max_x - Math.abs(this.xpos + this.max_x)) : (Math.abs(this.xpos - this.max_x) - this.max_x);
        }
        this.ypos = this.ypos - this.dy;
        if( Math.abs(this.ypos) >= this.max_y ) {
            this.ypos = this.ypos < 0 ? (this.max_y - Math.abs(this.ypos + this.max_y)) : (Math.abs(this.ypos - this.max_y) - this.max_y);
        }

        // x and y relative to background
        this.xpos_img = (this.xpos_img + this.dx) % this.background_width;
        this.xpos_img = this.xpos_img < 0 ? this.background_width + this.xpos_img : this.xpos_img;
        this.ypos_img = (this.ypos_img + this.dy) % this.background_height;
        this.ypos_img = this.ypos_img < 0 ? this.background_height + this.ypos_img : this.ypos_img;

        // Update frame
        this.frame_counter = (this.frame_counter + 1) % this.tile_interval;
        if( this.frame_counter == 0 ) {
            this.tile_num = (this.tile_num + 1) > this.total_tiles ? 1 : this.tile_num + 1;
        }
    }

    this.draw_background = function() {
        var sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;

        if( this.xpos_img + this.context.width/2 > this.background_width ) {
            if( this.ypos_img + this.context.height/2 > this.background_height ) {
                // Bottom right

                sx = this.xpos_img - this.context.width/2;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 + (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 + (this.background_height - this.ypos_img);
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 - (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 + (this.background_height - this.ypos_img);
                dx = this.context.width - sWidth;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = this.xpos_img - this.context.width/2;
                sy = 0;
                sWidth = this.context.width/2 + (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 - (this.background_height - this.ypos_img);
                dx = 0;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = 0;
                sWidth = this.context.width/2 - (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 - (this.background_height - this.ypos_img);
                dx = this.context.width - sWidth;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            else if ( this.ypos_img - this.context.height/2 < 0 ) {
                // Top right

                sx = this.xpos_img - this.context.width/2;
                sy = this.background_height - (this.context.height/2 - this.ypos_img);
                sWidth = this.context.width/2 + (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 - this.ypos_img;
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = this.background_height - (this.context.height/2 - this.ypos_img);
                sWidth = this.context.width/2 - (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 - this.ypos_img;
                dx = this.context.width - sWidth;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = this.xpos_img - this.context.width/2;
                sy = 0;
                sWidth = this.context.width/2 + (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 + this.ypos_img;
                dx = 0;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = 0;
                sWidth = this.context.width/2 - (this.background_width - this.xpos_img);
                sHeight = this.context.height/2 + this.ypos_img;
                dx = this.context.width - sWidth;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            else {
                // Far right

                sx = this.xpos_img - this.context.width/2;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 + (this.background_width - this.xpos_img);
                sHeight = this.context.height;
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 - (this.background_width - this.xpos_img);
                sHeight = this.context.height;
                dx = this.context.width - sWidth;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }
        else if ( this.xpos_img - this.context.width/2 < 0 ) {
            if( this.ypos_img + this.context.height/2 > this.background_height ) {
                // Bottom left

                sx = this.background_width - (this.context.width/2 - this.xpos_img);
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 - this.xpos_img;
                sHeight = this.context.height/2 + (this.background_height - this.ypos_img);
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 + this.xpos_img;
                sHeight = this.context.height/2 + (this.background_height - this.ypos_img);
                dx = this.context.width - sWidth;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = this.background_width - (this.context.width/2 - this.xpos_img);
                sy = 0;
                sWidth = this.context.width/2 - this.xpos_img;
                sHeight = this.context.height/2 - (this.background_height - this.ypos_img);
                dx = 0;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = 0;
                sWidth = this.context.width/2 + this.xpos_img;
                sHeight = this.context.height/2 - (this.background_height - this.ypos_img);
                dx = this.context.width - sWidth;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                
            }
            else if ( this.ypos_img - this.context.height/2 < 0) {
                // Top left

                sx = this.background_width - (this.context.width/2 - this.xpos_img);
                sy = this.background_height - (this.context.height/2 - this.ypos_img);
                sWidth = this.context.width/2 - this.xpos_img;
                sHeight = this.context.height/2 - this.ypos_img;
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = this.background_height - (this.context.height/2 - this.ypos_img);
                sWidth = this.context.width/2 + this.xpos_img;
                sHeight = this.context.height/2 - this.ypos_img;
                dx = this.context.width - sWidth;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = this.background_width - (this.context.width/2 - this.xpos_img);
                sy = 0;
                sWidth = this.context.width/2 - this.xpos_img;
                sHeight = this.context.height/2 + this.ypos_img;
                dx = 0;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = 0;
                sWidth = this.context.width/2 + this.xpos_img;
                sHeight = this.context.height/2 + this.ypos_img;
                dx = this.context.width - sWidth;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            else {
                // Far left

                sx = this.background_width - (this.context.width/2 - this.xpos_img);
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 - this.xpos_img;
                sHeight = this.context.height;
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = 0;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width/2 + this.xpos_img;
                sHeight = this.context.height;
                dx = this.context.width - sWidth;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }
        else {
            if( this.ypos_img + this.context.height/2 > this.background_height ) {
                // Bottom

                sx = this.xpos_img - this.context.width/2;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width;
                sHeight = this.context.height/2 + (this.background_height - this.ypos_img);
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = this.xpos_img - this.context.width/2;
                sy = 0;
                sWidth = this.context.width;
                sHeight = this.context.height/2 - (this.background_height - this.ypos_img);
                dx = 0;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            else if ( this.ypos_img - this.context.height/2 < 0 ) {
                // Top

                sx = this.xpos_img - this.context.width/2;
                sy = this.background_height - (this.context.height/2 - this.ypos_img);
                sWidth = this.context.width;
                sHeight = this.context.height/2 - this.ypos_img;
                dx = 0;
                dy = 0;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                sx = this.xpos_img - this.context.width/2;
                sy = 0;
                sWidth = this.context.width;
                sHeight = this.context.height/2 + this.ypos_img;
                dx = 0;
                dy = this.context.height - sHeight;
                dWidth = sWidth;
                dHeight = sHeight;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            else {
                // Middle

                sx = this.xpos_img - this.context.width/2;
                sy = this.ypos_img - this.context.height/2;
                sWidth = this.context.width;
                sHeight = this.context.height;
                dx = 0;
                dy = 0;
                dWidth = this.context.width;
                dHeight = this.context.height;
                this.context.drawImage(this.background_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }
    }

    this.animLoop = function() {
        if(this.state == 'running') {
            this.anim_frame = requestAnimFrame(this.animLoop.bind(this));
            this.move();
        }
    }

    this.start = function() {
        if( this.state != 'running') {
            this.state = 'running';
            this.animLoop();
        }
    }

    this.stop = function() {
        this.state = 'stopped';
        cancelAnimFrame(this.anim_frame);
    }
}

function speech(character_limit) {
    this.listening = false;
    this.character_limit = character_limit;

    this.handle = function(code) {
        if( code == 13 ) {
            this.trigger();
            return true;
        }

        // Some character
        if( code == 32 || (code >= 32 ) ) {
            //console.log(code, String.fromCharCode(code));
        }
        // Backspace
        else if ( code == 8 ) {
            //console.log("Backspace");
        }
    }

    this.trigger = function() {
        // Toggle listening
        this.listening = !this.listening;
        //console.log(this.listening);

        // Start listening to keyboard input
        if( this.listening ) {
            this.display_prompt();
            $('#speech_prompt_form').find('input[type="text"]').focus();
        }
        else {
            this.remove_prompt();
        }
        return true;
    }

    this.display_prompt = function() {
        var prompt = '' +
            '<div id="speech_prompt" style="background-color: #000; opacity: 0.6; z-index: 1000; top: 70%; width: 100%; height: 50px; position: absolute;">' +
            '<form action="." id="speech_prompt_form" style="opacity: 1; z-index: 2000; position: relative; top: 20%;">' +
            '<input type="text" maxlength="'+this.character_limit.toString()+'" style="position: relative; left: 2%; width: 90%;"></input>' +
            '<input type="submit" style="display: none;"></submit>' +
            '</form></div>';

        $('body').append(prompt);
    }

    this.remove_prompt = function() {
        $('#speech_prompt').remove();
        return true;
    }
}
