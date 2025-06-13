import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { Variable, bind, exec } from "astal"
import Slider from "./components/Slider"

import Wp from "gi://AstalWp"

const time = Variable("").poll(10000, "date '+%d/%m %R'")
const wp = Wp.get_default()
const speaker = wp.audio.default_speaker;

const volumeLevel = new Variable(0).poll(1000, () => {
    const output = exec(`sh -c "wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk '{print $2}'"`);
    const numericValue = parseFloat(output) || 0;
    return numericValue
})
const command = "sh -c \"brightnessctl i | grep -oP '\\(\\K[0-9]+' | awk '{printf \\\"%.2f\\n\\\", \\$1/100}'\""
const brightLevel = Variable(exec(command))
log(brightLevel.get())
export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    
    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <box/>
            <box halign={Gtk.Align.END}>
                <menubutton cssClasses={["bar-button"]}>
                    <Gtk.Image pixelSize={14} iconName={"system-search"}/>
                    <popover autohide={false} hasArrow={false} cssClasses={["control-popup"]} position={Gtk.PositionType.BOTTOM}>
                        <box
                            halign={Gtk.Align.END}
                            vertical
                        >
                                <label halign={Gtk.Align.START}label={"Control Center"}/>
                            <box >
                                <Slider title={"Brightness"} item={time} initialValue={brightLevel()} icon={"display-brightness"}/>
                                <Slider title={"Volume"} item={speaker} initialValue={volumeLevel((v)=> v)} icon={"audio-volume-high"}/>
                            </box>
                            <box cssClasses={["button-group"]}>
                                <button
                                    cssClasses={["menu-toggle", "active"]}
                                    onClicked="echo hi"
                                >
                                    <Gtk.Image cssClasses={["icon"]} pixelSize={24} iconName={"network-wireless"}/>
                                </button>
                                <button
                                    cssClasses={["menu-toggle"]}
                                    onClicked="echo hi"
                                >
                                    <Gtk.Image cssClasses={["icon"]} pixelSize={24} iconName={"bluetooth-active"} />
                                </button>
                            </box>
                            <box cssClasses={["button-group"]}>
                                <button
                                    cssClasses={["menu-toggle", ""]}
                                    onClicked="echo hi"
                                >
                                    <Gtk.Image cssClasses={["icon"]} pixelSize={24} iconName={"user-available"}/>
                                </button>
                                <button
                                    cssClasses={["menu-toggle"]}
                                    onClicked="echo hi"
                                >
                                    <Gtk.Image cssClasses={["icon"]} pixelSize={24} iconName={"application-exit"} />
                                </button>
                            </box>
                        </box>
                    </popover>
                </menubutton>
                <menubutton
                    hexpand
                >
                    <label label={time()}/>
                    <popover
                        hasArrow={false}
                        cssClasses={["calendar-popup"]}
                    >
                        <Gtk.Calendar />
                    </popover>
                </menubutton>
            </box>
        </centerbox>
    </window>
}
