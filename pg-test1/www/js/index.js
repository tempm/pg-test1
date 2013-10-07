/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize:function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents:function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    createTypeAhead:function () {
        $('#command.typeahead').typeahead({
            name:'command',
            remote:{
                url:'data/blank.json',
                filter:function () {
                    console.log('filter');
                    var val = $('#command').val();
                    var prefix = val.substr(0, val.lastIndexOf('.'));
                    var os = [];
                    if (prefix == '') {
                        os = eval('window');
                    } else {
                        os = eval(prefix);
                        prefix = prefix + '.';
                    }
                    var objs = [];
                    for (var obj in os) {
                        var command = prefix + obj
                        if (S(command).startsWith(val)) {
                            objs.push(command);
                        }
                    }
                    return objs;
                }
            }
        });
    },
    onDeviceReady:function () {
        $('#console-form').submit(function (e) {
            e.preventDefault();
            var command = $('#command').val();
            var r = eval(command);
            var span = $('<span></span>').addClass('text-muted').text(command);
            $('#console').prepend('\n');
            $('#console').prepend(r + '\n');
            $('#console').prepend('\n');
            $('#console').prepend(span);
            $('#command').val('');
            return false;
        });
        app.createTypeAhead();
    }

};
